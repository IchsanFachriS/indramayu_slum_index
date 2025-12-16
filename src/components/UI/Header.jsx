import React from 'react';
import { Map } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-xl z-[1000] flex items-center gap-3">
      <Map size={24} className="flex-shrink-0" />
      <div>
        <h1 className="font-bold text-lg leading-tight">
          {title || 'WebGIS Indeks Kekumuhan'}
        </h1>
        <p className="text-xs text-blue-100">Kabupaten Indramayu</p>
      </div>
    </div>
  );
};

export default Header;