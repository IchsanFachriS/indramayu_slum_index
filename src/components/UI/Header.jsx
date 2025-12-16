import React from 'react';
import { MapPin, Map } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] max-w-2xl w-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 p-1">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-4">
              {/* Icon with Gradient Background */}
              <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg">
                <Map size={28} className="text-white" />
              </div>
              
              {/* Title Content */}
              <div className="flex-1">
                <h1 className="font-bold text-lg text-gray-900 leading-tight mb-1">
                  {title || 'WebGIS Indeks Kekumuhan'}
                </h1>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-blue-600" />
                  <span className="text-gray-600 font-medium">Kabupaten Indramayu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;