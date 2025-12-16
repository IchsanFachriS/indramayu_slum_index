import React, { useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, LayersControl } from 'react-leaflet';
import LayerControl from './LayerControl.jsx';
import Legend from './Legend';
import InfoPanel from './InfoPanel';
import GeoTIFFLayer from './GeoTIFFLayer';
import 'leaflet/dist/leaflet.css';

const MapContainer = ({ metadata }) => {
  const [activeLayer, setActiveLayer] = useState(11);
  const [visibleLayers, setVisibleLayers] = useState([11]);
  const [layersData, setLayersData] = useState([]);

  useEffect(() => {
    if (metadata?.layers) {
      setLayersData(metadata.layers);
    }
  }, [metadata]);

  const toggleLayerVisibility = (layerId) => {
    setVisibleLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const handleLayerChange = (layerId) => {
    setActiveLayer(layerId);
    if (!visibleLayers.includes(layerId)) {
      setVisibleLayers(prev => [...prev, layerId]);
    }
  };

  const center = metadata?.area?.center || [-6.35, 108.15];
  const zoom = metadata?.area?.defaultZoom || 11;

  return (
    <div className="w-full h-full relative">
      <LeafletMap
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render GeoTIFF Layers */}
        {layersData.map(layer => (
          visibleLayers.includes(layer.id) && (
            <GeoTIFFLayer
              key={layer.id}
              layer={layer}
              bounds={metadata?.area?.bounds}
              classification={metadata?.classification}
            />
          )
        ))}
      </LeafletMap>

      {/* UI Controls */}
      <LayerControl 
        layers={layersData}
        activeLayer={activeLayer}
        onLayerChange={handleLayerChange}
        visibleLayers={visibleLayers}
        onToggleVisibility={toggleLayerVisibility}
      />
      
      <InfoPanel metadata={metadata} />
      <Legend classification={metadata?.classification} />

      {/* Watermark */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 px-3 py-1 rounded text-xs text-gray-600 z-[1000]">
        © 2024 WebGIS Kabupaten Indramayu
      </div>
    </div>
  );
};

export default MapContainer;