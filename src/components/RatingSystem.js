import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const RatingCategory = ({ title, icon, rating, onRatingChange, disabled }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <span className="text-lg mr-2">{icon}</span>
        <h4 className="font-medium text-gray-700">{title}</h4>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !disabled && onRatingChange(star)}
            disabled={disabled}
            className={`transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
          >
            {star <= rating ? (
              <StarIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <StarOutlineIcon className="w-6 h-6 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const ModelRating = ({ modelNumber, modelName, provider, ratings, onRatingsChange, disabled }) => {
  const colorClass = modelNumber === 1 ? 'blue' : 'green';
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <span className={`bg-${colorClass}-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3`}>
          {modelNumber}
        </span>
        <div>
          <h3 className="font-semibold text-gray-800">{modelName}</h3>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
      </div>

      <RatingCategory
        title="Clarity"
        icon="✅"
        rating={ratings.clarity}
        onRatingChange={(rating) => onRatingsChange({ ...ratings, clarity: rating })}
        disabled={disabled}
      />

      <RatingCategory
        title="Accuracy"
        icon="🧠"
        rating={ratings.accuracy}
        onRatingChange={(rating) => onRatingsChange({ ...ratings, accuracy: rating })}
        disabled={disabled}
      />

      <RatingCategory
        title="Conciseness"
        icon="✂️"
        rating={ratings.conciseness}
        onRatingChange={(rating) => onRatingsChange({ ...ratings, conciseness: rating })}
        disabled={disabled}
      />

      {/* Average Rating */}
      {(ratings.clarity || ratings.accuracy || ratings.conciseness) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Average Rating:</span>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-800 mr-2">
                {((ratings.clarity + ratings.accuracy + ratings.conciseness) / 3).toFixed(1)}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round((ratings.clarity + ratings.accuracy + ratings.conciseness) / 3)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RatingSystem = ({ summaries, ratings, onRatingsChange, onPreferenceChange, preference }) => {
  const hasSummaries = summaries.model1 && summaries.model2;

  if (!hasSummaries) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Rate the Summaries</h3>
        <div className="text-center py-12 text-gray-500">
          <p>Summaries must be generated before you can rate them.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Rate the Summaries</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ModelRating
          modelNumber={1}
          modelName={summaries.model1.model}
          provider={summaries.model1.provider}
          ratings={ratings.model1}
          onRatingsChange={(newRatings) => onRatingsChange({ ...ratings, model1: newRatings })}
          disabled={false}
        />

        <ModelRating
          modelNumber={2}
          modelName={summaries.model2.model}
          provider={summaries.model2.provider}
          ratings={ratings.model2}
          onRatingsChange={(newRatings) => onRatingsChange({ ...ratings, model2: newRatings })}
          disabled={false}
        />
      </div>

      {/* Overall Preference */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Which summary do you prefer overall?</h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onPreferenceChange('model1')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              preference === 'model1'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                1
              </span>
              <span className="font-medium">{summaries.model1.model}</span>
            </div>
          </button>

          <button
            onClick={() => onPreferenceChange('model2')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              preference === 'model2'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                2
              </span>
              <span className="font-medium">{summaries.model2.model}</span>
            </div>
          </button>

          <button
            onClick={() => onPreferenceChange('tie')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              preference === 'tie'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="font-medium">It's a tie! 🤝</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingSystem; 