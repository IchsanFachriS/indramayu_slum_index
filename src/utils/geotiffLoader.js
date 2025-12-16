import * as GeoTIFF from 'geotiff';
import { getColorForValue } from './colorScale';

/**
 * Load and process GeoTIFF file
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
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);

    // Find min and max values for normalization
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < data.length; i++) {
      if (data[i] !== null && isFinite(data[i])) {
        min = Math.min(min, data[i]);
        max = Math.max(max, data[i]);
      }
    }

    // Convert raster data to RGBA
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      let color;

      if (value === null || !isFinite(value)) {
        // Transparent for no-data values
        color = { r: 0, g: 0, b: 0, a: 0 };
      } else {
        // Normalize value to 1-5 scale
        const normalizedValue = min === max ? 3 : 
          1 + ((value - min) / (max - min)) * 4;
        
        const classValue = Math.round(normalizedValue);
        color = getColorForValue(classValue, classification);
      }

      const idx = i * 4;
      imageData.data[idx] = color.r;
      imageData.data[idx + 1] = color.g;
      imageData.data[idx + 2] = color.b;
      imageData.data[idx + 3] = color.a;
    }

    ctx.putImageData(imageData, 0, 0);
    const imageUrl = canvas.toDataURL('image/png');

    return {
      imageUrl,
      bounds,
      width,
      height,
      min,
      max
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
  const promises = layers.map(layer => 
    loadGeoTIFF(`/data/geotiff/${layer.file}`, classification)
      .then(result => ({ ...layer, ...result }))
      .catch(error => {
        console.error(`Failed to load layer ${layer.name}:`, error);
        return { ...layer, error: error.message };
      })
  );

  return Promise.all(promises);
}