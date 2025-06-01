import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { TrophyIcon, ChartBarIcon } from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const ReportCard = ({ summaries, ratings, preference }) => {
  const hasRatings = (ratings.model1.clarity || ratings.model1.accuracy || ratings.model1.conciseness) &&
                     (ratings.model2.clarity || ratings.model2.accuracy || ratings.model2.conciseness);

  if (!summaries.model1 || !summaries.model2) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-2" />
          Overall Report Card
        </h3>
        <div className="text-center py-12 text-gray-500">
          <p>Complete the comparison and ratings to see the report card.</p>
        </div>
      </div>
    );
  }

  // Calculate averages
  const model1Average = hasRatings 
    ? ((ratings.model1.clarity + ratings.model1.accuracy + ratings.model1.conciseness) / 3).toFixed(1)
    : 'N/A';
  
  const model2Average = hasRatings 
    ? ((ratings.model2.clarity + ratings.model2.accuracy + ratings.model2.conciseness) / 3).toFixed(1)
    : 'N/A';

  // Prepare chart data
  const barChartData = {
    labels: ['Clarity', 'Accuracy', 'Conciseness', 'Overall Average'],
    datasets: [
      {
        label: summaries.model1.model,
        data: hasRatings 
          ? [ratings.model1.clarity, ratings.model1.accuracy, ratings.model1.conciseness, parseFloat(model1Average)]
          : [0, 0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: summaries.model2.model,
        data: hasRatings 
          ? [ratings.model2.clarity, ratings.model2.accuracy, ratings.model2.conciseness, parseFloat(model2Average)]
          : [0, 0, 0, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: ['Clarity', 'Accuracy', 'Conciseness'],
    datasets: [
      {
        label: summaries.model1.model,
        data: hasRatings 
          ? [ratings.model1.clarity, ratings.model1.accuracy, ratings.model1.conciseness]
          : [0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
      {
        label: summaries.model2.model,
        data: hasRatings 
          ? [ratings.model2.clarity, ratings.model2.accuracy, ratings.model2.conciseness]
          : [0, 0, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Determine winner
  const getWinner = () => {
    if (!hasRatings) return null;
    
    if (preference === 'model1') return summaries.model1.model;
    if (preference === 'model2') return summaries.model2.model;
    if (preference === 'tie') return 'Tie';
    
    // Fallback to average rating
    if (parseFloat(model1Average) > parseFloat(model2Average)) return summaries.model1.model;
    if (parseFloat(model2Average) > parseFloat(model1Average)) return summaries.model2.model;
    return 'Tie';
  };

  const winner = getWinner();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <ChartBarIcon className="w-6 h-6 mr-2" />
        Overall Report Card
      </h3>

      {/* Winner Announcement */}
      {winner && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-yellow-600 mr-3" />
            <div className="text-center">
              <h4 className="text-xl font-bold text-yellow-800">
                {winner === 'Tie' ? "It's a Tie!" : `Winner: ${winner}`}
              </h4>
              <p className="text-yellow-700 mt-1">
                {winner === 'Tie' 
                  ? "Both models performed equally well!"
                  : "Based on your ratings and preference"
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-blue-800 mb-2">{summaries.model1.model}</h4>
          <p className="text-3xl font-bold text-blue-600 mb-1">{model1Average}</p>
          <p className="text-sm text-blue-700">Average Rating</p>
          <p className="text-xs text-blue-600 mt-2">
            Response Time: {summaries.model1.responseTime}ms
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-gray-800 mb-2">Comparison</h4>
          <p className="text-lg text-gray-600 mb-1">
            {hasRatings ? `${Math.abs(parseFloat(model1Average) - parseFloat(model2Average)).toFixed(1)} pts` : 'N/A'}
          </p>
          <p className="text-sm text-gray-700">Difference</p>
          <p className="text-xs text-gray-600 mt-2">
            Your Preference: {preference ? (preference === 'tie' ? 'Tie' : `Model ${preference.slice(-1)}`) : 'None'}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-green-800 mb-2">{summaries.model2.model}</h4>
          <p className="text-3xl font-bold text-green-600 mb-1">{model2Average}</p>
          <p className="text-sm text-green-700">Average Rating</p>
          <p className="text-xs text-green-600 mt-2">
            Response Time: {summaries.model2.responseTime}ms
          </p>
        </div>
      </div>

      {/* Charts */}
      {hasRatings && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Detailed Comparison</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          {/* Radar Chart */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Radar</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <Radar data={radarChartData} options={radarOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Performance Breakdown */}
      {hasRatings && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['clarity', 'accuracy', 'conciseness'].map((category) => (
              <div key={category} className="text-center">
                <h5 className="font-medium text-gray-700 mb-2 capitalize">{category}</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">{summaries.model1.model}:</span>
                    <span className="font-semibold">{ratings.model1[category]}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">{summaries.model2.model}:</span>
                    <span className="font-semibold">{ratings.model2[category]}/5</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Winner: {ratings.model1[category] > ratings.model2[category] 
                      ? summaries.model1.model 
                      : ratings.model2[category] > ratings.model1[category] 
                        ? summaries.model2.model 
                        : 'Tie'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard; 