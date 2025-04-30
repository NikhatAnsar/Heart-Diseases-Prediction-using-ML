import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function ChatBot() {
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean}>>([
    { text: "Hello! I'm your Heart Health Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm here to help you understand heart health better. What specific questions do you have?",
        isBot: true
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto h-[500px] flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <MessageCircle className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Chat with Health Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
              msg.isBot ? 'bg-gray-100' : 'bg-blue-500 text-white'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}