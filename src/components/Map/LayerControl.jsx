import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff, Layers, Star } from 'lucide-react';

const LayerControl = ({ layers, activeLayer, onLayerChange, visibleLayers, onToggleVisibility }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'parameter', 'composite'

  // Separate layers by category
  const compositeLayer = layers.find(l => l.isComposite);
  const parameterLayers = layers.filter(l => !l.isComposite);

  const filteredLayers = filter === 'all' 
    ? layers 
    : filter === 'composite' 
      ? [compositeLayer] 
      : parameterLayers;

  return (
    <div className="absolute top-20 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl z-[1000] w-96 max-h-[calc(100vh-120px)] flex flex-col border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={20} className="flex-shrink-0" />
            <h3 className="font-bold text-sm">Kontrol Layer Peta</h3>
          </div>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isOpen && (
        <>
          {/* Filter Tabs */}
          <div className="px-2 py-2 bg-gray-50 border-b border-gray-200 flex gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Semua ({layers.length})
            </button>
            <button
              onClick={() => setFilter('composite')}
              className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1 ${
                filter === 'composite' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star size={12} />
              Komposit
            </button>
            <button
              onClick={() => setFilter('parameter')}
              className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                filter === 'parameter' 
                  ? 'bg-cyan-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Parameter ({parameterLayers.length})
            </button>
          </div>

          {/* Layer List */}
          <div className="p-3 overflow-y-auto flex-1 space-y-2">
            {filteredLayers.map(layer => (
              <div 
                key={layer.id}
                className={`group relative rounded-lg transition-all duration-200 overflow-hidden ${
                  activeLayer === layer.id 
                    ? layer.isComposite
                      ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-400 shadow-lg ring-2 ring-purple-200' 
                      : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400 shadow-lg ring-2 ring-blue-200'
                    : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {/* Composite Badge */}
                {layer.isComposite && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                    <Star size={10} />
                    KOMPOSIT
                  </div>
                )}

                <div className="p-3">
                  <div className="flex items-start gap-2">
                    {/* Layer Number Badge */}
                    <div 
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm ${
                        activeLayer === layer.id
                          ? layer.isComposite 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                            : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {layer.id}
                    </div>

                    {/* Layer Content */}
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => onLayerChange(layer.id)}
                    >
                      <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${
                        activeLayer === layer.id ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {layer.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                        {layer.file}
                      </p>
                      {layer.isComposite && (
                        <div className="mt-1">
                          <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-semibold rounded">
                            Hasil Gabungan 11 Parameter
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Visibility Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility(layer.id);
                      }}
                      className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                        visibleLayers.includes(layer.id)
                          ? 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
                      }`}
                      title={visibleLayers.includes(layer.id) ? 'Sembunyikan layer' : 'Tampilkan layer'}
                    >
                      {visibleLayers.includes(layer.id) ? 
                        <Eye size={18} /> : 
                        <EyeOff size={18} />
                      }
                    </button>
                  </div>
                </div>

                {/* Active Indicator */}
                {activeLayer === layer.id && (
                  <div className={`h-1 ${
                    layer.isComposite 
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500'
                      : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500'
                  }`}></div>
                )}
              </div>
            ))}

            {filteredLayers.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Layers size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Tidak ada layer</p>
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <p className="text-gray-500 mb-0.5">Layer Aktif</p>
                <p className="font-bold text-gray-800 truncate">
                  {layers.find(l => l.id === activeLayer)?.name || '-'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <p className="text-gray-500 mb-0.5">Terlihat</p>
                <p className="font-bold text-gray-800">
                  {visibleLayers.length} / {layers.length}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LayerControl;