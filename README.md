# Battle of the LLMs: Summarizer Showdown

A modern React web application that allows users to compare text summarization capabilities between different Large Language Models (LLMs) side-by-side. Compare closed-source models like GPT-4 and Claude with open-source models from HuggingFace in an interactive, user-friendly interface.

## 🌟 Features

### Model Selection
- **Closed-Source Models**: OpenAI GPT-3.5/GPT-4, Anthropic Claude
- **Open-Source Models**: Facebook BART, Google Pegasus, Mistral AI Mixtral
- **Flexible Combinations**: Choose any combination of closed-source and open-source models

### Text Input Options
- **Manual Text Input**: Paste or type text directly
- **Sample Texts**: Pre-loaded examples for quick testing
- **File Upload**: Upload .txt files for summarization

### Side-by-Side Comparison
- **Real-time Results**: See summaries from both models simultaneously
- **Performance Metrics**: Response time and summary statistics
- **Visual Indicators**: Color-coded model identification

### User Rating System
- **Multi-dimensional Rating**: Rate on Clarity, Accuracy, and Conciseness (1-5 stars)
- **Overall Preference**: Choose your preferred summary
- **Interactive Interface**: Star-based rating system with visual feedback

### Comprehensive Report Card
- **Visual Analytics**: Bar charts and radar charts for performance comparison
- **Winner Declaration**: Automatic winner determination based on ratings
- **Detailed Breakdown**: Category-wise performance analysis
- **Statistical Summary**: Average ratings and performance metrics

### Security & Privacy
- **Local Storage**: API keys stored securely in browser localStorage
- **No Server**: All processing happens client-side
- **Secure API Integration**: Direct communication with AI service providers

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API keys for the AI services you want to use

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd battle-of-llms-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### API Key Setup

The application requires API keys for the AI services you want to use:

#### OpenAI (for GPT models)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)

#### Anthropic (for Claude models)
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Copy the key (starts with `sk-ant-`)

#### HuggingFace (for open-source models)
1. Visit [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token
3. Copy the token (starts with `hf_`)

**Note**: API keys are stored locally in your browser and never sent to any server except the respective AI service providers.

## 🛠️ Usage

1. **Configure API Keys**
   - Click the "API Keys" button in the header
   - Enter your API keys for the services you want to use
   - Keys are automatically saved to localStorage

2. **Select Models**
   - Choose a closed-source model from the first dropdown
   - Choose an open-source model from the second dropdown

3. **Input Text**
   - Paste your text, select a sample, or upload a .txt file
   - Recommended: 500-1000 words for optimal results

4. **Generate Summaries**
   - Click "Compare Summaries" to run both models
   - Wait for both summaries to complete

5. **Rate and Compare**
   - Rate each summary on Clarity, Accuracy, and Conciseness
   - Select your overall preference
   - View the comprehensive report card

## 📊 Supported Models

### Closed-Source Models
- **GPT-3.5 Turbo** (OpenAI) - Fast and cost-effective
- **GPT-4** (OpenAI) - High accuracy and reasoning
- **Claude 3 Haiku** (Anthropic) - Fast and efficient

### Open-Source Models
- **BART Large CNN** (Facebook/Meta) - Optimized for news summarization
- **Pegasus XSum** (Google) - Excellent for abstractive summarization
- **Mixtral 8x7B** (Mistral AI) - High-quality instruction-following model

## 🏗️ Architecture

### Frontend Framework
- **React 18** with functional components and hooks
- **Tailwind CSS** for modern, responsive styling
- **Heroicons** for consistent iconography
- **Chart.js** for data visualization

### API Integration
- **Axios** for HTTP requests
- **OpenAI API** for GPT models
- **Anthropic API** for Claude models
- **HuggingFace Inference API** for open-source models

### State Management
- React useState and useEffect hooks
- localStorage for persistent API key storage
- Centralized state in App component

## 📁 Project Structure

```
src/
├── components/
│   ├── ModelSelector.js      # Model selection dropdowns
│   ├── TextInput.js          # Text input with tabs and samples
│   ├── SummaryComparison.js  # Side-by-side summary display
│   ├── RatingSystem.js       # Star rating interface
│   ├── ReportCard.js         # Charts and analytics
│   └── ApiKeyManager.js      # API key configuration modal
├── services/
│   └── llmService.js         # API integration and model configs
├── App.js                    # Main application component
├── index.js                  # React entry point
└── index.css                 # Global styles and Tailwind imports
```

## 🔧 Configuration

### Model Configuration
Models are configured in `src/services/llmService.js`. To add new models:

1. Add model configuration to `MODEL_CONFIGS`
2. Implement API integration function if needed
3. Update model categorization in `getModelsByCategory()`

### Styling
The application uses Tailwind CSS for styling. Customize colors and themes in `tailwind.config.js`.

## 💡 Features in Detail

### Smart Error Handling
- Comprehensive error messages for API failures
- Input validation for text length and model selection
- Graceful fallbacks for API rate limits

### Performance Optimization
- Parallel API calls for faster results
- Optimized re-renders with React hooks
- Responsive design for all screen sizes

### User Experience
- Loading states with skeleton screens
- Visual feedback for all interactions
- Persistent settings across sessions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built application is a static React app that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables
No environment variables are needed as API keys are entered by users directly in the interface.

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed description
3. Include browser and API provider information

## 🎯 Roadmap

- [ ] Additional AI models (Cohere, Hugging Face Transformers)
- [ ] Batch processing for multiple texts
- [ ] Export functionality for results
- [ ] Advanced analytics and insights
- [ ] Model performance benchmarking
- [ ] Custom model fine-tuning integration

---

**Built with ❤️ using React, Tailwind CSS, and modern AI APIs** 