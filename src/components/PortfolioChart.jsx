import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PortfolioChart({ portfolio }) {
  const chartData = {
    labels: portfolio.map((p) => p.symbol),
    datasets: [
      {
        label: 'Quantity',
        data: portfolio.map((p) => p.quantity),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
      {
        label: 'Avg Price',
        data: portfolio.map((p) => p.avg_price),
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
}
