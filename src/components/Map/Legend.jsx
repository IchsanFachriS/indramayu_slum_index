import React, { useEffect, useState } from 'react';
import { Target } from 'lucide-react';

const Legend = ({ classification, layerName, isComposite, scale }) => {
  const [currentClassification, setCurrentClassification] = useState(null);

  // Update classification ketika props berubah
  useEffect(() => {
    if (classification) {
      setCurrentClassification(classification);
      console.log('Legend updated for layer:', layerName);
      console.log('Classification:', classification);
    }
  }, [classification, layerName]);

  if (!currentClassification) {
    return null;
  }

  const values = Object.entries(currentClassification).reverse();

  return (
    <div className="absolute bottom-8 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl z-[1000] max-w-sm border border-gray-200 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className={`px-4 py-3 ${isComposite ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} text-white`}>
        <div className="flex items-center gap-2 mb-1">
          <Target size={18} className="flex-shrink-0" />
          <h3 className="font-bold text-sm">Klasifikasi Indeks</h3>
        </div>
        {isComposite && (
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-medium">
              Layer Komposit
            </span>
          </div>
        )}
      </div>

      {/* Layer Name */}
      <div className="px-4 py-2 bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-700 line-clamp-2">
          {layerName || 'Layer Aktif'}
        </p>
      </div>

      {/* Legend Items */}
      <div className="p-4 space-y-2.5 max-h-80 overflow-y-auto">
        {values.map(([key, value]) => (
          <div 
            key={key} 
            className="group flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            {/* Color Box with Animation */}
            <div className="relative flex-shrink-0">
              <div 
                className="w-10 h-10 rounded-lg shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-200" 
                style={{ backgroundColor: value.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
              </div>
              <div className="absolute -top-1 -right-1 bg-white rounded-full px-1.5 py-0.5 text-[10px] font-bold text-gray-700 shadow-sm border border-gray-200">
                {key}
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-gray-800 mb-0.5">
                {value.label}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div className="flex-1">
            <p className="font-medium mb-1">Skala Penilaian: {scale || '1-5'}</p>
            <p className="text-[10px] text-gray-500 italic">
              {isComposite 
                ? '1 = Sangat Kumuh | 5 = Sangat Baik' 
                : '1 = Kondisi Terburuk | 5 = Kondisi Terbaik'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;