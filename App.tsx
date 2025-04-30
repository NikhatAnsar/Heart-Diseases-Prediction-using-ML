import { useState } from 'react';
import { Brain, FileText, MessageCircle } from 'lucide-react';
import Header from './components/Header/Header';
import Hero from './components/Home/Hero';
import FeatureCard from './components/Home/FeatureCard';
import PredictionForm from './components/PredictionForm/PredictionForm';
import ChatBot from './components/ChatBot/ChatBot';
import ResultsDisplay from './components/ResultsDisplay';
import InfoPanel from './components/InfoPanel/InfoPanel';

interface PredictionResult {
  prediction: number;
  patientData: any;
}

function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [activeSection, setActiveSection] = useState<'home' | 'predict' | 'chat'>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'predict':
        return (
          <div className="space-y-6">
            <PredictionForm onPredict={setPrediction} />
            <ResultsDisplay prediction={prediction} />
          </div>
        );
      case 'chat':
        return <ChatBot />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            <FeatureCard
              icon={<Brain className="text-blue-500" size={24} />}
              title="Make Predictions"
              description="Use our ML model to make accurate predictions based on your input data."
              actionText="Try it now"
              onClick={() => setActiveSection('predict')}
            />
            <FeatureCard
              icon={<FileText className="text-green-500" size={24} />}
              title="Generate Reports"
              description="Download detailed PDF reports of your predictions for documentation."
              actionText="Start now"
              onClick={() => setActiveSection('predict')}
            />
            <FeatureCard
              icon={<MessageCircle className="text-purple-500" size={24} />}
              title="Get Assistance"
              description="Chat with our AI assistant for help and guidance with the platform."
              actionText="Chat now"
              onClick={() => setActiveSection('chat')}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="container mx-auto py-12">
        {renderContent()}
      </main>
      <InfoPanel />
    </div>
  );
}

export default App;