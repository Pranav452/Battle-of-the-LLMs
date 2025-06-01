import React from 'react';
import { ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const SummaryComparison = ({ summaries, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Summary Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((num) => (
            <div key={num} className="border border-gray-200 rounded-lg p-6">
              <div className="animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Summary Comparison</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-red-800 font-medium">Error generating summaries</h4>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!summaries.model1 && !summaries.model2) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Summary Comparison</h3>
        <div className="text-center py-12 text-gray-500">
          <p>No summaries yet. Select models and input text, then click "Compare Summaries" to begin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Summary Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model 1 Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                1
              </span>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {summaries.model1?.model || 'Model 1'}
                </h4>
                <p className="text-sm text-gray-500">
                  {summaries.model1?.provider || 'Closed-Source'}
                </p>
              </div>
            </div>
            {summaries.model1 && (
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="w-4 h-4 mr-1" />
                {summaries.model1.responseTime}ms
              </div>
            )}
          </div>
          
          {summaries.model1 ? (
            <div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-gray-800 leading-relaxed">
                  {summaries.model1.summary}
                </p>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Summary generated successfully
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <p>Summary will appear here after processing</p>
            </div>
          )}
        </div>

        {/* Model 2 Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                2
              </span>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {summaries.model2?.model || 'Model 2'}
                </h4>
                <p className="text-sm text-gray-500">
                  {summaries.model2?.provider || 'Open-Source'}
                </p>
              </div>
            </div>
            {summaries.model2 && (
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="w-4 h-4 mr-1" />
                {summaries.model2.responseTime}ms
              </div>
            )}
          </div>
          
          {summaries.model2 ? (
            <div>
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-gray-800 leading-relaxed">
                  {summaries.model2.summary}
                </p>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Summary generated successfully
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <p>Summary will appear here after processing</p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Stats */}
      {summaries.model1 && summaries.model2 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Quick Comparison</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-600">Response Time</p>
              <p className="font-semibold">
                Model 1: {summaries.model1.responseTime}ms<br />
                Model 2: {summaries.model2.responseTime}ms
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Summary Length</p>
              <p className="font-semibold">
                Model 1: {summaries.model1.summary.length} chars<br />
                Model 2: {summaries.model2.summary.length} chars
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Word Count</p>
              <p className="font-semibold">
                Model 1: {summaries.model1.summary.split(/\s+/).length} words<br />
                Model 2: {summaries.model2.summary.split(/\s+/).length} words
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryComparison; 