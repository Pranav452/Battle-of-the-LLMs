import React, { useState, useEffect } from 'react';
import { Bars3Icon, KeyIcon, PlayIcon } from '@heroicons/react/24/outline';
import ModelSelector from './components/ModelSelector';
import TextInput from './components/TextInput';
import SummaryComparison from './components/SummaryComparison';
import RatingSystem from './components/RatingSystem';
import ReportCard from './components/ReportCard';
import ApiKeyManager from './components/ApiKeyManager';
import { getModelsByCategory, getSummary } from './services/llmService';

function App() {
  // State management
  const [selectedModel1, setSelectedModel1] = useState('');
  const [selectedModel2, setSelectedModel2] = useState('');
  const [inputText, setInputText] = useState('');
  const [summaries, setSummaries] = useState({ model1: null, model2: null });
  const [ratings, setRatings] = useState({
    model1: { clarity: 0, accuracy: 0, conciseness: 0 },
    model2: { clarity: 0, accuracy: 0, conciseness: 0 }
  });
  const [preference, setPreference] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    huggingface: ''
  });
  const [showApiKeyManager, setShowApiKeyManager] = useState(false);

  // Load API keys from localStorage on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('llm-battle-api-keys');
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Error loading API keys from localStorage:', error);
      }
    }
  }, []);

  // Save API keys to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('llm-battle-api-keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  // Get model categories
  const { closedSource, openSource } = getModelsByCategory();

  // Handle summary comparison
  const handleCompareSummaries = async () => {
    if (!selectedModel1 || !selectedModel2) {
      setError('Please select both models before comparing summaries.');
      return;
    }

    if (!inputText.trim()) {
      setError('Please provide input text for summarization.');
      return;
    }

    if (inputText.trim().length < 100) {
      setError('Input text should be at least 100 characters long for meaningful summarization.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummaries({ model1: null, model2: null });

    try {
      // Run both summarizations in parallel
      const [summary1, summary2] = await Promise.all([
        getSummary(selectedModel1, inputText, apiKeys),
        getSummary(selectedModel2, inputText, apiKeys)
      ]);

      setSummaries({
        model1: summary1,
        model2: summary2
      });

      // Reset ratings when new summaries are generated
      setRatings({
        model1: { clarity: 0, accuracy: 0, conciseness: 0 },
        model2: { clarity: 0, accuracy: 0, conciseness: 0 }
      });
      setPreference(null);

    } catch (error) {
      console.error('Error generating summaries:', error);
      setError(error.message || 'An error occurred while generating summaries.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if compare button should be enabled
  const canCompare = selectedModel1 && selectedModel2 && inputText.trim() && !isLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bars3Icon className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Battle of the LLMs</h1>
                <p className="text-sm text-gray-600">Summarizer Showdown</p>
              </div>
            </div>
            <button
              onClick={() => setShowApiKeyManager(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <KeyIcon className="w-4 h-4 mr-2" />
              API Keys
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            🥊 Compare AI Summarization Models
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Select two different LLM models (one closed-source, one open-source), input your text, 
            and compare their summarization capabilities side-by-side. Rate them on clarity, accuracy, 
            and conciseness to see which model performs better for your use case.
          </p>
        </div>

        {/* Model Selection */}
        <ModelSelector
          selectedModel1={selectedModel1}
          selectedModel2={selectedModel2}
          onModel1Change={setSelectedModel1}
          onModel2Change={setSelectedModel2}
          closedSourceModels={closedSource}
          openSourceModels={openSource}
        />

        {/* Text Input */}
        <TextInput
          text={inputText}
          onTextChange={setInputText}
          isLoading={isLoading}
        />

        {/* Compare Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleCompareSummaries}
            disabled={!canCompare}
            className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all ${
              canCompare
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <PlayIcon className="w-6 h-6 mr-2" />
            {isLoading ? 'Generating Summaries...' : 'Compare Summaries'}
          </button>
        </div>

        {/* Summary Comparison */}
        <SummaryComparison
          summaries={summaries}
          isLoading={isLoading}
          error={error}
        />

        {/* Rating System */}
        <RatingSystem
          summaries={summaries}
          ratings={ratings}
          onRatingsChange={setRatings}
          onPreferenceChange={setPreference}
          preference={preference}
        />

        {/* Report Card */}
        <ReportCard
          summaries={summaries}
          ratings={ratings}
          preference={preference}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Battle of the LLMs: Summarizer Showdown
            </p>
            <p className="text-sm text-gray-500">
              Compare and evaluate different AI models for text summarization. 
              Built with React, powered by OpenAI, Anthropic, and HuggingFace APIs.
            </p>
          </div>
        </div>
      </footer>

      {/* API Key Manager Modal */}
      <ApiKeyManager
        apiKeys={apiKeys}
        onApiKeysChange={setApiKeys}
        isOpen={showApiKeyManager}
        onClose={() => setShowApiKeyManager(false)}
      />
    </div>
  );
}

export default App; 