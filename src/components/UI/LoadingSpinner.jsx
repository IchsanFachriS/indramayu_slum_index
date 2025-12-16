import React from 'react';
import { Loader2, Map } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Map size={64} className="text-blue-600" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 size={32} className="text-blue-600 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-800">Memuat WebGIS...</h2>
        </div>
        <p className="text-gray-600">Mohon tunggu sebentar</p>
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;