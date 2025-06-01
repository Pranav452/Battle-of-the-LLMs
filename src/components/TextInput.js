import React, { useState } from 'react';
import { DocumentTextIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

// Sample texts for quick testing
const SAMPLE_TEXTS = [
  {
    title: "AI Technology News",
    content: "Artificial intelligence continues to revolutionize industries across the globe, with companies investing billions in machine learning research and development. Recent breakthroughs in natural language processing have enabled more sophisticated chatbots and virtual assistants that can understand context and nuance in human communication. The healthcare sector has particularly benefited from AI innovations, with diagnostic tools now capable of identifying diseases earlier and more accurately than traditional methods. Meanwhile, autonomous vehicles are moving closer to widespread deployment, though regulatory challenges remain. Tech giants like Google, Microsoft, and OpenAI are competing fiercely to develop the most advanced AI systems, each claiming significant improvements in reasoning capabilities and safety measures. However, experts warn about potential risks including job displacement, privacy concerns, and the need for robust ethical guidelines. Educational institutions are also adapting their curricula to prepare students for an AI-driven future, emphasizing the importance of human-AI collaboration rather than replacement. As we stand at the threshold of artificial general intelligence, society must carefully balance innovation with responsibility to ensure these powerful technologies benefit humanity as a whole."
  },
  {
    title: "Climate Change Report",
    content: "The latest climate science report reveals alarming trends in global temperature rise, with 2023 marking another record-breaking year for extreme weather events worldwide. Scientists from leading research institutions have documented accelerating ice sheet loss in Antarctica and Greenland, contributing to rising sea levels that threaten coastal communities. The report emphasizes that greenhouse gas emissions continue to climb despite international commitments to reduce carbon footprints, with fossil fuel consumption remaining stubbornly high in many developing nations. Renewable energy adoption has shown promising growth, particularly in solar and wind power installations, but experts argue the transition needs to happen much faster to meet Paris Agreement goals. Extreme weather patterns, including unprecedented heatwaves, devastating hurricanes, and prolonged droughts, have caused billions in economic damage and displaced millions of people. The agriculture sector faces mounting challenges as changing precipitation patterns and temperature extremes threaten food security globally. Marine ecosystems are experiencing severe stress from ocean acidification and warming waters, leading to widespread coral bleaching and fish population decline. Despite these challenges, the report also highlights successful conservation efforts and innovative technologies that offer hope for mitigation and adaptation strategies."
  },
  {
    title: "Space Exploration Update",
    content: "NASA's Artemis program continues to make significant progress toward returning humans to the Moon, with the successful completion of Artemis I marking a crucial milestone in deep space exploration. The Space Launch System (SLS) rocket demonstrated its capabilities during the uncrewed test flight, paving the way for future crewed missions planned for 2025. Meanwhile, private space companies like SpaceX and Blue Origin are revolutionizing space travel with reusable rocket technology and ambitious plans for Mars colonization. The James Webb Space Telescope has exceeded expectations, delivering stunning images and groundbreaking scientific discoveries about the early universe, exoplanets, and star formation processes. International collaboration remains strong with the International Space Station serving as a testbed for technologies and research that will enable long-duration spaceflight. Commercial space ventures are also expanding rapidly, with satellite constellations providing global internet coverage and space tourism becoming a reality for wealthy civilians. Scientists are particularly excited about upcoming missions to Europa and Enceladus, Jupiter and Saturn's moons respectively, which may harbor conditions suitable for life. The growing space economy is creating new job opportunities and inspiring a new generation of scientists, engineers, and explorers to push the boundaries of human knowledge and presence beyond Earth."
  }
];

const TextInput = ({ text, onTextChange, isLoading }) => {
  const [activeTab, setActiveTab] = useState('paste');

  const handleSampleSelect = (sampleText) => {
    onTextChange(sampleText);
    setActiveTab('paste');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        onTextChange(e.target.result);
        setActiveTab('paste');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Input Text for Summarization</h3>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => setActiveTab('paste')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'paste'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <DocumentTextIcon className="w-4 h-4 inline mr-2" />
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('samples')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'samples'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Sample Texts
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'upload'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <CloudArrowUpIcon className="w-4 h-4 inline mr-2" />
          Upload File
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'paste' && (
        <div>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Paste your text here for summarization (500-1000 words recommended)..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>Character count: {text.length}</span>
            <span>Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
          </div>
        </div>
      )}

      {activeTab === 'samples' && (
        <div className="space-y-3">
          <p className="text-gray-600 text-sm mb-4">
            Choose from these sample texts to quickly test the summarization models:
          </p>
          {SAMPLE_TEXTS.map((sample, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">{sample.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {sample.content.substring(0, 200)}...
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {sample.content.length} characters • {sample.content.split(/\s+/).length} words
                  </p>
                </div>
                <button
                  onClick={() => handleSampleSelect(sample.content)}
                  className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  disabled={isLoading}
                >
                  Use This
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="text-center py-12">
          <CloudArrowUpIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-800 mb-2">Upload a text file</h4>
          <p className="text-gray-600 mb-4">Select a .txt file to upload and summarize</p>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={isLoading}
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <CloudArrowUpIcon className="w-4 h-4 mr-2" />
            Choose File
          </label>
        </div>
      )}
    </div>
  );
};

export default TextInput; 