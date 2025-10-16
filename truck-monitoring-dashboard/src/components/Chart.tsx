import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { trucksApi } from '../api/trucksApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats: { date: string; deliveries: number; onTime: number; delayed: number }[] = await trucksApi.fetchDeliveryStats();
        
        setChartData({
          labels: stats.map((s) => {
            const date = new Date(s.date);
            return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
          }),
          datasets: [
            {
              label: 'Total Deliveries',
              data: stats.map((s) => s.deliveries),
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1,
            },
            {
              label: 'On Time',
              data: stats.map((s) => s.onTime),
              backgroundColor: 'rgba(34, 197, 94, 0.6)',
              borderColor: 'rgb(34, 197, 94)',
              borderWidth: 1,
            },
            {
              label: 'Delayed',
              data: stats.map((s) => s.delayed),
              backgroundColor: 'rgba(239, 68, 68, 0.6)',
              borderColor: 'rgb(239, 68, 68)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch delivery stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
      title: {
        display: false,
      },
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
        grid: {
          display: false,
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="card flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="card flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400">Failed to load chart data</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Delivery Statistics (Last 7 Days)
      </h2>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
