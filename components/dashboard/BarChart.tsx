// components/BarChartComponent.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC = ({ data  }) => {
  // Data for the chart
  const chartData = {
    labels: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    datasets: [
      {
        label: 'Value',
        data: [80, 50, 40, 90, 60, 70, 45, 65, 30, 50, 100, 85, 70, 75, 60, 40, 50, 85, 90, 100, 80],
        backgroundColor: '#3B82F6', // Tailwind Blue-500
        barThickness: 15, // Thinner bars
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
    },
    scales: {
      x: {
        display: true, // Show the x-axis
        grid: {
          display: false, // Remove the gridlines
        },
        ticks: {
          font: {
            family: 'Arial', // Custom font for labels
            // size: 12, // Font size for x-axis labels
          },
        },
      },
      y: {
        display: true, // Hide the y-axis but keep the labels on top of the bars
      },
    },
  };

  return (
    <div className=" bg-white p-4 shadow-lg rounded-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
