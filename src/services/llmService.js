import axios from 'axios';

// Configuration for different LLM models
export const MODEL_CONFIGS = {
  // Closed-source models
  'gpt-3.5-turbo': {
    type: 'openai',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI'
  },
  'gpt-4': {
    type: 'openai',
    name: 'GPT-4',
    provider: 'OpenAI'
  },
  'claude-3-haiku': {
    type: 'anthropic',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic'
  },
  
  // Open-source models via HuggingFace
  'facebook/bart-large-cnn': {
    type: 'huggingface',
    name: 'BART Large CNN',
    provider: 'Facebook/Meta'
  },
  'google/pegasus-xsum': {
    type: 'huggingface',
    name: 'Pegasus XSum',
    provider: 'Google'
  },
  'mistralai/Mixtral-8x7B-Instruct-v0.1': {
    type: 'huggingface',
    name: 'Mixtral 8x7B',
    provider: 'Mistral AI'
  }
};

// OpenAI API integration
const callOpenAI = async (model, text, apiKey) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides concise and accurate summaries of text. Keep summaries between 2-4 sentences while capturing the key points.'
        },
        {
          role: 'user',
          content: `Please summarize the following text:\n\n${text}`
        }
      ],
      max_tokens: 200,
      temperature: 0.3
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    throw new Error(`OpenAI API Error: ${error.response?.data?.error?.message || error.message}`);
  }
};

// Anthropic Claude API integration
const callClaude = async (model, text, apiKey) => {
  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: model,
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `Please provide a concise summary of the following text in 2-4 sentences:\n\n${text}`
        }
      ]
    }, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    });
    
    return response.data.content[0].text.trim();
  } catch (error) {
    throw new Error(`Claude API Error: ${error.response?.data?.error?.message || error.message}`);
  }
};

// HuggingFace API integration
const callHuggingFace = async (model, text, apiKey) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        inputs: text,
        parameters: {
          max_length: 150,
          min_length: 30,
          do_sample: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Handle different response formats
    if (Array.isArray(response.data)) {
      return response.data[0].summary_text || response.data[0].generated_text;
    } else if (response.data.summary_text) {
      return response.data.summary_text;
    } else if (response.data.generated_text) {
      return response.data.generated_text;
    } else {
      throw new Error('Unexpected response format from HuggingFace API');
    }
  } catch (error) {
    if (error.response?.status === 503) {
      throw new Error('Model is loading. Please try again in a few moments.');
    }
    throw new Error(`HuggingFace API Error: ${error.response?.data?.error || error.message}`);
  }
};

// Main summarization function
export const getSummary = async (modelId, text, apiKeys) => {
  const config = MODEL_CONFIGS[modelId];
  
  if (!config) {
    throw new Error(`Unknown model: ${modelId}`);
  }
  
  const startTime = Date.now();
  
  try {
    let summary;
    
    switch (config.type) {
      case 'openai':
        if (!apiKeys.openai) {
          throw new Error('OpenAI API key is required');
        }
        summary = await callOpenAI(modelId, text, apiKeys.openai);
        break;
        
      case 'anthropic':
        if (!apiKeys.anthropic) {
          throw new Error('Anthropic API key is required');
        }
        summary = await callClaude(modelId, text, apiKeys.anthropic);
        break;
        
      case 'huggingface':
        if (!apiKeys.huggingface) {
          throw new Error('HuggingFace API key is required');
        }
        summary = await callHuggingFace(modelId, text, apiKeys.huggingface);
        break;
        
      default:
        throw new Error(`Unsupported model type: ${config.type}`);
    }
    
    const responseTime = Date.now() - startTime;
    
    return {
      summary,
      responseTime,
      model: config.name,
      provider: config.provider
    };
  } catch (error) {
    throw error;
  }
};

// Helper function to get models by category
export const getModelsByCategory = () => {
  const closedSource = [];
  const openSource = [];
  
  Object.entries(MODEL_CONFIGS).forEach(([key, config]) => {
    if (config.type === 'openai' || config.type === 'anthropic') {
      closedSource.push({ id: key, ...config });
    } else if (config.type === 'huggingface') {
      openSource.push({ id: key, ...config });
    }
  });
  
  return { closedSource, openSource };
}; 