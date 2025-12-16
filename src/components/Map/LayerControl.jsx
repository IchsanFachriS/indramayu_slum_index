import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

const LayerControl = ({ layers, activeLayer, onLayerChange, visibleLayers, onToggleVisibility }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-20 left-4 bg-white rounded-lg shadow-lg z-[1000] w-80 max-h-[calc(100vh-120px)] flex flex-col">
      <div 
        className="p-4 border-b cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-sm">Kontrol Layer</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="p-2 overflow-y-auto flex-1">
          {layers.map(layer => (
            <div 
              key={layer.id}
              className={`p-3 mb-2 rounded cursor-pointer transition-all ${
                activeLayer === layer.id 
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-sm' 
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div 
                  className="flex-1"
                  onClick={() => onLayerChange(layer.id)}
                >
                  <h4 className="font-semibold text-sm">{layer.name}</h4>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(layer.id);
                  }}
                  className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                  title={visibleLayers.includes(layer.id) ? 'Sembunyikan layer' : 'Tampilkan layer'}
                >
                  {visibleLayers.includes(layer.id) ? 
                    <Eye size={18} className="text-blue-600" /> : 
                    <EyeOff size={18} className="text-gray-400" />
                  }
                </button>
              </div>
              <p className="text-xs text-gray-600 mb-1">{layer.description}</p>
              {layer.parameter && (
                <p className="text-xs text-gray-500 italic">Parameter: {layer.parameter}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{layer.file}</p>
            </div>
          ))}
        </div>
      )}

      <div className="p-2 border-t bg-gray-50 text-xs text-gray-600">
        <p className="mb-1">
          <strong>Layer Aktif:</strong> {layers.find(l => l.id === activeLayer)?.name || '-'}
        </p>
        <p>
          <strong>Terlihat:</strong> {visibleLayers.length} dari {layers.length} layer
        </p>
      </div>
    </div>
  );
};

export default LayerControl;