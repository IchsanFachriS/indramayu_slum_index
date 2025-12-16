import * as GeoTIFF from 'geotiff';
import { getColorForValue } from './colorScale';

/**
 * Load and process GeoTIFF file
 * Transparent untuk no-data, SOLID untuk data (opacity 255)
 * @param {string} filePath - Path to the GeoTIFF file
 * @param {object} classification - Classification configuration
 * @returns {Promise<object>} - Processed image data
 */
export async function loadGeoTIFF(filePath, classification) {
  try {
    // Fetch the GeoTIFF file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch GeoTIFF: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    
    // Get raster data
    const rasters = await image.readRasters();
    const width = image.getWidth();
    const height = image.getHeight();
    const data = rasters[0]; // First band

    // Get no-data value if specified
    const noDataValue = image.getFileDirectory().GDAL_NODATA 
      ? parseFloat(image.getFileDirectory().GDAL_NODATA) 
      : null;

    // Get geographic bounds
    const bbox = image.getBoundingBox();
    const bounds = {
      southwest: [bbox[1], bbox[0]], // [lat, lng]
      northeast: [bbox[3], bbox[2]]  // [lat, lng]
    };

    // Create canvas for visualization
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.createImageData(width, height);

    // Find min and max values for normalization (excluding no-data)
    let min = Infinity;
    let max = -Infinity;
    let hasData = false;

    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      
      // Check if value is valid data
      const isNoData = value === null || 
                       !isFinite(value) || 
                       (noDataValue !== null && Math.abs(value - noDataValue) < 0.001) ||
                       value === -9999 || // Common no-data value
                       value === -3.4e38;  // Another common no-data value
      
      if (!isNoData) {
        min = Math.min(min, value);
        max = Math.max(max, value);
        hasData = true;
      }
    }

    // If no valid data found, use default range
    if (!hasData) {
      min = 1;
      max = 5;
    }

    console.log(`Layer processing: min=${min}, max=${max}, noData=${noDataValue}`);

    // Convert raster data to RGBA
    // No-data = transparent (alpha 0)
    // Data = SOLID/OPAQUE (alpha 255)
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const idx = i * 4;

      // Check if value is no-data
      const isNoData = value === null || 
                       !isFinite(value) || 
                       (noDataValue !== null && Math.abs(value - noDataValue) < 0.001) ||
                       value === -9999 || 
                       value === -3.4e38;

      if (isNoData) {
        // Make no-data pixels completely transparent
        imageData.data[idx] = 0;
        imageData.data[idx + 1] = 0;
        imageData.data[idx + 2] = 0;
        imageData.data[idx + 3] = 0; // Alpha = 0 (transparent)
      } else {
        // Normalize value to 1-5 scale
        let normalizedValue;
        if (min === max) {
          normalizedValue = 3; // Middle value if all data is the same
        } else {
          normalizedValue = 1 + ((value - min) / (max - min)) * 4;
        }
        
        // Round to nearest integer classification (1-5)
        const classValue = Math.max(1, Math.min(5, Math.round(normalizedValue)));
        
        // Get color from classification
        const color = getColorForValue(classValue, classification);
        
        // Apply color with FULL OPACITY (solid/tidak transparan)
        imageData.data[idx] = color.r;
        imageData.data[idx + 1] = color.g;
        imageData.data[idx + 2] = color.b;
        imageData.data[idx + 3] = 255; // Alpha = 255 (SOLID/OPAQUE)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const imageUrl = canvas.toDataURL('image/png');

    return {
      imageUrl,
      bounds,
      width,
      height,
      min,
      max,
      noDataValue
    };

  } catch (error) {
    console.error('Error loading GeoTIFF:', error);
    throw error;
  }
}

/**
 * Load multiple GeoTIFF layers
 * @param {Array} layers - Array of layer configurations
 * @param {object} classification - Classification configuration
 * @returns {Promise<Array>} - Array of processed layers
 */
export async function loadMultipleLayers(layers, classification) {
  const promises = layers.map(layer => {
    const layerClassification = layer.classification || classification;
    
    return loadGeoTIFF(`/data/geotiff/${layer.file}`, layerClassification)
      .then(result => ({ ...layer, ...result }))
      .catch(error => {
        console.error(`Failed to load layer ${layer.name}:`, error);
        return { ...layer, error: error.message };
      });
  });

  return Promise.all(promises);
}