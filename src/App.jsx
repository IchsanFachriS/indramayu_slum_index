import React, { useState, useEffect } from 'react';
import MapContainer from './components/Map/MapContainer';
import Header from './components/UI/Header';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load metadata
    fetch('/data/metadata.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load metadata');
        }
        return response.json();
      })
      .then(data => {
        setMetadata(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading metadata:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md border border-red-200">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Application</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-medium shadow-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <Header title={metadata?.project?.title} />
      <MapContainer metadata={metadata} />
    </div>
  );
}

export default App;