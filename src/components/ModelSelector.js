import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ModelSelector = ({ 
  selectedModel1, 
  selectedModel2, 
  onModel1Change, 
  onModel2Change, 
  closedSourceModels, 
  openSourceModels 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Model 1 - Closed Source */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
            1
          </span>
          Closed-Source Model
        </h3>
        <div className="relative">
          <select
            value={selectedModel1}
            onChange={(e) => onModel1Change(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
          >
            <option value="">Select a closed-source model...</option>
            {closedSourceModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        {selectedModel1 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Provider:</strong> {closedSourceModels.find(m => m.id === selectedModel1)?.provider}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Commercial API - Higher accuracy, faster responses
            </p>
          </div>
        )}
      </div>

      {/* Model 2 - Open Source */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
            2
          </span>
          Open-Source Model
        </h3>
        <div className="relative">
          <select
            value={selectedModel2}
            onChange={(e) => onModel2Change(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white pr-10"
          >
            <option value="">Select an open-source model...</option>
            {openSourceModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        {selectedModel2 && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Provider:</strong> {openSourceModels.find(m => m.id === selectedModel2)?.provider}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Open-source via HuggingFace - Free, transparent, customizable
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSelector; 