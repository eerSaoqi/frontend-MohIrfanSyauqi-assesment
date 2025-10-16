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

const palette = (i: number) => `hsl(${(i * 57) % 360} 70% 50%)`;

const FuelConsumptionChart = () => {
  const fuelHistory = useAppSelector((s) => s.fuelHistory.byTruckId);
  const trucks = useAppSelector((s) => s.trucks.trucks);

  const data = useMemo(() => {
    const truckIdToLabel: Record<string, string> = {};
    trucks.forEach((t) => (truckIdToLabel[t.id] = t.plateNumber));

    const ids = Object.keys(fuelHistory);
    const allTimestamps = new Set<number>();
    ids.forEach((id) => fuelHistory[id].forEach((s) => allTimestamps.add(s.timestamp)));
    const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => a - b);
    const labels = sortedTimestamps.map((ts) => new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));

    const datasets = ids.map((id, idx) => {
      const samples = fuelHistory[id];
      const map = new Map<number, number>();
      samples.forEach((s) => map.set(s.timestamp, s.fuelLevel));
      const color = palette(idx);
      const series = sortedTimestamps.map((ts) => (map.has(ts) ? map.get(ts)! : null));
      return {
        label: truckIdToLabel[id] || `Truck ${id}`,
        data: series,
        borderColor: color,
        backgroundColor: color,
        tension: 0.35,
        pointRadius: 0,
        fill: false,
        spanGaps: true,
      };
    });

    return { labels, datasets } as any;
  }, [fuelHistory, trucks]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: {
      legend: {
        position: 'left' as const,
        labels: {
          usePointStyle: true,
          padding: 12,
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
      title: { display: false },
      tooltip: {
        mode: 'nearest' as const,
        intersect: false,
        callbacks: {
          label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
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
  }), []);

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Fuel Consumption (Realtime)</h2>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FuelConsumptionChart;
