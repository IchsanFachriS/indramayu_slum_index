import React, { useEffect, useState } from 'react';
import { ImageOverlay, useMap } from 'react-leaflet';
import { loadGeoTIFF } from '../../utils/geotiffLoader';

const GeoTIFFLayer = ({ layer, bounds, classification, isActive }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [layerBounds, setLayerBounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const map = useMap();

  useEffect(() => {
    const loadLayer = async () => {
      setLoading(true);
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
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="${randomColor}" opacity="0.3"/>
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)"/>
            <rect x="100" y="150" width="200" height="100" rx="10" fill="white" opacity="0.9"/>
            <text x="200" y="190" text-anchor="middle" fill="${randomColor}" font-size="16" font-weight="bold" font-family="Arial, sans-serif">
              ${layer.name}
            </text>
            <text x="200" y="215" text-anchor="middle" fill="#666" font-size="12" font-family="Arial, sans-serif">
              Data sedang dimuat...
            </text>
          </svg>
        `;
        
        setImageUrl(`data:image/svg+xml,${encodeURIComponent(svg)}`);
        setLayerBounds(bounds);
      } finally {
        setLoading(false);
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

  // Opacity set to 1 (solid/tidak transparan) untuk layer dengan data
  const opacity = 1;

  return (
    <ImageOverlay
      url={imageUrl}
      bounds={leafletBounds}
      opacity={opacity}
      zIndex={isActive ? 1000 : 900}
      className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
    />
  );
};

export default GeoTIFFLayer;