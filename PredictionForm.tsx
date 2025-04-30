import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function PredictionForm({ onPredict }: { onPredict: (result: number) => void }) {
  const [formData, setFormData] = useState({
    age: '',
    sex: '1',
    cp: '0',
    trestbps: '',
    chol: '',
    fbs: '0',
    restecg: '0',
    thalach: '',
    exang: '0',
    oldpeak: '',
    slope: '0',
    ca: '0',
    thal: '0'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally process the data through the ML model
    // For now, we'll simulate a prediction
    const mockPrediction = Math.random() > 0.5 ? 1 : 0;
    onPredict(mockPrediction);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="text-red-500" size={24} />
        <h2 className="text-xl font-semibold">Heart Disease Prediction Form</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

        {/* Add more form fields here */}

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Generate Prediction
          </button>
        </div>
      </form>
    </div>
  );
}