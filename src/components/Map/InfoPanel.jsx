import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const InfoPanel = ({ metadata }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!metadata) return null;

  const { project, area, layers, credits } = metadata;

  return (
    <div className="absolute top-20 right-4 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        title="Informasi Aplikasi"
      >
        <Info size={24} className="text-blue-600" />
      </button>
      
      {isOpen && (
        <div className="absolute top-0 right-0 bg-white rounded-lg shadow-xl w-96 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="sticky top-0 bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold text-lg">Informasi WebGIS</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Project Info */}
            <div>
              <h4 className="font-bold text-md mb-2 text-gray-800">{project?.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{project?.description}</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Versi:</strong> {project?.version}</p>
                <p><strong>Dibuat:</strong> {project?.created}</p>
                <p><strong>Update Terakhir:</strong> {project?.lastUpdated}</p>
              </div>
            </div>

            {/* Area Info */}
            <div className="border-t pt-4">
              <h4 className="font-bold text-sm mb-2 text-gray-800">Wilayah</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Kabupaten:</strong> {area?.name}</p>
                <p><strong>Provinsi:</strong> {area?.province}</p>
                <p><strong>Pusat Peta:</strong> {area?.center?.join(', ')}</p>
              </div>
            </div>

            {/* Layers Info */}
            <div className="border-t pt-4">
              <h4 className="font-bold text-sm mb-2 text-gray-800">Parameter Pemetaan</h4>
              <p className="text-sm text-gray-600 mb-2">
                Total {layers?.length} parameter kekumuhan:
              </p>
              <ul className="text-xs text-gray-600 space-y-1 pl-4">
                {layers?.slice(0, 10).map(layer => (
                  <li key={layer.id} className="list-disc">{layer.name}</li>
                ))}
                {layers?.length > 10 && (
                  <li className="list-disc font-semibold">{layers[10].name}</li>
                )}
              </ul>
            </div>

            {/* Credits */}
            <div className="border-t pt-4">
              <h4 className="font-bold text-sm mb-2 text-gray-800">Kredit & Sumber Data</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Data:</strong> {credits?.data}</p>
                <p><strong>Analisis:</strong> {credits?.analysis}</p>
                <p><strong>Peta Dasar:</strong> {credits?.basemap}</p>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="border-t pt-4 bg-blue-50 p-3 rounded">
              <h4 className="font-bold text-sm mb-2 text-blue-800">Cara Penggunaan</h4>
              <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                <li>Klik layer untuk mengaktifkan</li>
                <li>Gunakan ikon mata untuk show/hide layer</li>
                <li>Multiple layer dapat ditampilkan bersamaan</li>
                <li>Lihat legenda untuk interpretasi warna</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;