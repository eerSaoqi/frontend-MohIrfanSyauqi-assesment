import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../hooks/useAppDispatch';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const FuelChart = () => {
  const { trucks } = useAppSelector((state) => state.trucks);

  const data = useMemo(() => {
    const sorted = [...trucks].sort((a, b) => b.fuelLevel - a.fuelLevel);
    const labels = sorted.map((t) => `${t.plateNumber}`);
    const values = sorted.map((t) => t.fuelLevel);

    return {
      labels,
      datasets: [
        {
          label: 'Fuel Level (%)',
          data: values,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
        },
      ],
    };
  }, [trucks]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
      },
    },
    animation: {
      duration: 300,
    },
  }), []);

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Fuel Levels (Realtime)</h2>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FuelChart;
