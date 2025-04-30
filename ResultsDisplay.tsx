import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { featureInfo } from '../utils/featureInfo';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultsDisplayProps {
  prediction: { prediction: number; patientData: any } | null;
}

export default function ResultsDisplay({ prediction }: ResultsDisplayProps) {
  const data = {
    labels: ['Risk', 'No Risk'],
    datasets: [{
      data: prediction?.prediction === 1 ? [100, 0] : [0, 100],
      backgroundColor: ['#ef4444', '#22c55e'],
      borderWidth: 0
    }]
  };

  const generatePDF = () => {
    if (!prediction) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;
    const lineHeight = 7;

    // Title and Patient Info
    doc.setFontSize(20);
    doc.text('Heart Disease Prediction Report', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 2;

    doc.setFontSize(12);
    doc.text('Patient Information', 20, yPos);
    yPos += lineHeight;

    // Patient Details
    doc.setFontSize(10);
    doc.text(`Name: ${prediction.patientData.name}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos);
    yPos += lineHeight * 2;

    // Prediction Result
    doc.setFontSize(12);
    doc.text('Prediction Result', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.text(
      `Based on the analysis: ${prediction.prediction === 1 ? 'Risk Detected' : 'No Risk Detected'}`,
      20,
      yPos
    );
    yPos += lineHeight * 2;

    // Medical Measurements
    doc.setFontSize(12);
    doc.text('Medical Measurements', 20, yPos);
    yPos += lineHeight;

    doc.setFontSize(10);
    Object.entries(prediction.patientData).forEach(([key, value]) => {
      if (key === 'name') return; // Skip name as it's already shown above
      
      const info = featureInfo[key as keyof typeof featureInfo];
      if (info) {
        const label = info.title;
        let displayValue = value;
        
        // Convert numerical codes to descriptive text for certain fields
        if (key === 'sex') displayValue = value === '1' ? 'Male' : 'Female';
        if (key === 'cp') {
          const cpTypes = ['Typical Angina', 'Atypical Angina', 'Non-anginal Pain', 'Asymptomatic'];
          displayValue = cpTypes[parseInt(value as string)];
        }

        doc.text(`${label}: ${displayValue}`, 20, yPos);
        yPos += lineHeight;
      }
    });

    // Recommendations
    yPos += lineHeight;
    doc.setFontSize(12);
    doc.text('Recommendations', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.text([
      '1. Regular check-ups with healthcare provider',
      '2. Maintain a healthy diet and exercise routine',
      '3. Monitor blood pressure and cholesterol levels',
      '4. Follow prescribed medications if any',
      '5. Avoid smoking and limit alcohol consumption'
    ], 20, yPos);

    // Disclaimer
    yPos += lineHeight * 7;
    doc.setFontSize(8);
    doc.text(
      'Disclaimer: This prediction is based on machine learning analysis and should not be considered as a medical diagnosis. ' +
      'Always consult with healthcare professionals for proper medical advice.',
      20,
      yPos,
      { maxWidth: pageWidth - 40 }
    );

    doc.save('heart-disease-prediction-report.pdf');
  };

  if (!prediction) return null;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full max-w-[200px] mx-auto">
          <Doughnut data={data} />
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-medium mb-2">
            {prediction.prediction === 1 ? 'Risk Detected' : 'No Risk Detected'}
          </h3>
          <p className="text-gray-600 mb-4">
            {prediction.prediction === 1 
              ? `Based on the provided information for ${prediction.patientData.name}, there might be a risk of heart disease. Please consult with a healthcare professional.`
              : `Based on the provided information for ${prediction.patientData.name}, no significant risk factors were detected. However, maintain a healthy lifestyle and regular check-ups.`}
          </p>
          
          <button
            onClick={generatePDF}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download size={20} />
            <span>Download Detailed Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}