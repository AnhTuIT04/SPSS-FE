// components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((point) => point.date),
    datasets: [
      {
        label: 'Print Log',
        data: data.map((point) => point.value),
        fill: true, // Shaded area
        borderColor: '#007bff', // Line color
        backgroundColor: 'rgba(0, 123, 255, 0.1)', // Light blue shaded area
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.3, // Smoothness of the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hide the legend
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem: any) {
            return ` ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          maxTicksLimit: 10, // Limit number of x-axis labels to 10
          callback: function (value: any, index: number, values: any) {
            // Show labels at intervals, e.g., only every nth label
            const showEveryNth = Math.ceil(values.length / 10); // Adjust the divisor as needed
            return index % showEveryNth === 0 ? this.getLabelForValue(value) : '';
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false, // Remove the y-axis border
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
