import React, { useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import LayerControl from './LayerControl.jsx';
import Legend from './Legend';
import GeoTIFFLayer from './GeoTIFFLayer';
import 'leaflet/dist/leaflet.css';

const MapContainer = ({ metadata }) => {
  const [activeLayer, setActiveLayer] = useState(12); // Default layer ID 12
  const [visibleLayers, setVisibleLayers] = useState([12]); // Default visible layer
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

  // Get current active layer data for dynamic legend
  const currentLayer = layersData.find(layer => layer.id === activeLayer);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-slate-100">
      <LeafletMap
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={true}
        style={{ zIndex: 0 }}
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
              classification={layer.classification || metadata?.classification?.default}
              isActive={layer.id === activeLayer}
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
      
      {/* Dynamic Legend - berubah sesuai active layer */}
      <Legend 
        classification={currentLayer?.classification || metadata?.classification?.default}
        layerName={currentLayer?.name}
        isComposite={currentLayer?.isComposite}
        scale={metadata?.classification?.scale}
      />

      {/* Modern Watermark */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-xs text-gray-700 z-[1000] flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        <span className="font-medium">© 2024 WebGIS Kabupaten Indramayu</span>
      </div>
    </div>
  );
};

export default MapContainer;