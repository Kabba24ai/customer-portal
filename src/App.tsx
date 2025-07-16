import React, { useState } from 'react';
import CustomerPortal from './components/CustomerPortal';
import TaxExemptIconShowcase from './components/TaxExemptIconShowcase';

function App() {
  const [showIconShowcase, setShowIconShowcase] = useState(false);

  if (showIconShowcase) {
    return (
      <div>
        <div className="bg-blue-600 text-white p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-lg font-semibold">Tax Exempt Icon Showcase</h1>
            <button 
              onClick={() => setShowIconShowcase(false)}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm"
            >
              Back to Portal
            </button>
          </div>
        </div>
        <TaxExemptIconShowcase />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-yellow-100 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-yellow-800">🎨 DESIGN PREVIEW</span>
            </div>
            <button
              onClick={() => setShowIconShowcase(true)}
              className="px-3 py-1 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              View Tax Exempt Icons
            </button>
          </div>
        </div>
      </div>
      <CustomerPortal />
    </div>
  );
}

export default App;