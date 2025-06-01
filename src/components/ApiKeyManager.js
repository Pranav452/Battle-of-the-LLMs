import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, KeyIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ApiKeyInput = ({ label, value, onChange, placeholder, helpText, isVisible, onToggleVisibility }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {isVisible ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

const ApiKeyManager = ({ apiKeys, onApiKeysChange, isOpen, onClose }) => {
  const [visibility, setVisibility] = useState({
    openai: false,
    anthropic: false,
    huggingface: false
  });

  const toggleVisibility = (service) => {
    setVisibility(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const handleKeyChange = (service, value) => {
    onApiKeysChange({ ...apiKeys, [service]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <KeyIcon className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">API Key Configuration</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Information Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">API Keys are stored locally in your browser</p>
                <p>Your API keys are never sent to any server except the respective AI service providers. They are stored in your browser's local storage and will persist across sessions.</p>
              </div>
            </div>
          </div>

          {/* OpenAI API Key */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">OpenAI (GPT Models)</h3>
            <ApiKeyInput
              label="OpenAI API Key"
              value={apiKeys.openai}
              onChange={(value) => handleKeyChange('openai', value)}
              placeholder="sk-..."
              helpText="Required for GPT-3.5 and GPT-4 models. Get your key from https://platform.openai.com/api-keys"
              isVisible={visibility.openai}
              onToggleVisibility={() => toggleVisibility('openai')}
            />
          </div>

          {/* Anthropic API Key */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Anthropic (Claude)</h3>
            <ApiKeyInput
              label="Anthropic API Key"
              value={apiKeys.anthropic}
              onChange={(value) => handleKeyChange('anthropic', value)}
              placeholder="sk-ant-..."
              helpText="Required for Claude models. Get your key from https://console.anthropic.com/"
              isVisible={visibility.anthropic}
              onToggleVisibility={() => toggleVisibility('anthropic')}
            />
          </div>

          {/* HuggingFace API Key */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">HuggingFace (Open-Source Models)</h3>
            <ApiKeyInput
              label="HuggingFace API Token"
              value={apiKeys.huggingface}
              onChange={(value) => handleKeyChange('huggingface', value)}
              placeholder="hf_..."
              helpText="Required for open-source models via HuggingFace Inference API. Get your token from https://huggingface.co/settings/tokens"
              isVisible={visibility.huggingface}
              onToggleVisibility={() => toggleVisibility('huggingface')}
            />
          </div>

          {/* Usage Guidelines */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Usage Guidelines</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• API keys are required only for the models you want to use</li>
              <li>• OpenAI and Anthropic APIs have usage costs based on tokens</li>
              <li>• HuggingFace Inference API has free tier with rate limits</li>
              <li>• Keep your API keys secure and don't share them</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => {
              // Clear all API keys
              onApiKeysChange({ openai: '', anthropic: '', huggingface: '' });
            }}
            className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager; 