import React from 'react';

const Legend = ({ classification }) => {
  if (!classification || !classification.values) {
    return null;
  }

  const values = Object.entries(classification.values).reverse();

  return (
    <div className="absolute bottom-8 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] max-w-xs">
      <h3 className="font-bold text-sm mb-3 text-gray-800">
        Klasifikasi Indeks ({classification.scale})
      </h3>
      <div className="space-y-2">
        {values.map(([key, value]) => (
          <div key={key} className="flex items-start gap-2">
            <div 
              className="w-8 h-6 rounded flex-shrink-0 border border-gray-300" 
              style={{ backgroundColor: value.color }}
            ></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{key}</span>
                <span className="text-xs font-semibold text-gray-700">{value.label}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic">
          Semakin tinggi nilai, semakin baik kondisi permukiman
        </p>
      </div>
    </div>
  );
};

export default Legend;