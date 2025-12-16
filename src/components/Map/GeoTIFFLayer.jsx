import React, { useEffect, useState } from 'react';
import { ImageOverlay, useMap } from 'react-leaflet';
import { loadGeoTIFF } from '../../utils/geotiffLoader';

const GeoTIFFLayer = ({ layer, bounds, classification }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [layerBounds, setLayerBounds] = useState(null);
  const map = useMap();

  useEffect(() => {
    const loadLayer = async () => {
      try {
        const filePath = `/data/geotiff/${layer.file}`;
        const result = await loadGeoTIFF(filePath, classification);
        
        if (result) {
          setImageUrl(result.imageUrl);
          setLayerBounds(result.bounds || bounds);
        }
      } catch (error) {
        console.error(`Error loading GeoTIFF layer ${layer.name}:`, error);
        
        // Fallback: Create placeholder visualization
        const colors = ['#d32f2f', '#f57c00', '#fbc02d', '#7cb342', '#388e3c'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <rect width="200" height="200" fill="${randomColor}" opacity="0.5"/>
            <text x="100" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
              ${layer.name}
            </text>
            <text x="100" y="120" text-anchor="middle" fill="white" font-size="10">
              (Data placeholder)
            </text>
          </svg>
        `;
        
        setImageUrl(`data:image/svg+xml,${encodeURIComponent(svg)}`);
        setLayerBounds(bounds);
      }
    };

    loadLayer();
  }, [layer, bounds, classification]);

  if (!imageUrl || !layerBounds) {
    return null;
  }

  const leafletBounds = [
    [layerBounds.southwest[0], layerBounds.southwest[1]],
    [layerBounds.northeast[0], layerBounds.northeast[1]]
  ];

  return (
    <ImageOverlay
      url={imageUrl}
      bounds={leafletBounds}
      opacity={0.6}
      zIndex={1000}
    />
  );
};

export default GeoTIFFLayer;