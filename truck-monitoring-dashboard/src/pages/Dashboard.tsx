import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchTrucks, updateTruckInState } from '../features/trucks/trucksSlice';
import { useWebSocket } from '../hooks/useWebSocket';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';
import FuelConsumptionChart from '../components/FuelConsumptionChart';
import { addFuelSample } from '../features/fuel/fuelHistorySlice';
import { startMockFuelStream, stopMockFuelStream } from '../features/fuel/mockFuelStream';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { trucks, loading } = useAppSelector((state) => state.trucks);

  useEffect(() => {
    dispatch(fetchTrucks());
  }, [dispatch]);

  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';
  useWebSocket({
    url: wsUrl,
    onMessage: (data) => {
      if (data && data.type === 'truck_update' && data.truck) {
        dispatch(updateTruckInState(data.truck));
        if (typeof data.truck.fuelLevel === 'number') {
          const ts = data.truck.lastSeen ? Date.parse(data.truck.lastSeen) : Date.now();
          dispatch(addFuelSample({ truckId: data.truck.id, timestamp: ts, fuelLevel: data.truck.fuelLevel }));
        }
      }
      if (data && data.type === 'fuel_update') {
        const { truckId, timestamp, fuelLevel } = data;
        if (truckId && typeof fuelLevel === 'number') {
          const ts = typeof timestamp === 'number' ? timestamp : Date.parse(timestamp || '') || Date.now();
          dispatch(addFuelSample({ truckId, timestamp: ts, fuelLevel }));
        }
      }
    },
  });

  const mockFuel = String(import.meta.env.VITE_MOCK_FUEL || '').toLowerCase() === 'true';
  useEffect(() => {
    if (mockFuel && trucks.length > 0) {
      startMockFuelStream(dispatch, trucks);
      return () => {
        stopMockFuelStream();
      };
    }
  }, [mockFuel, trucks, dispatch]);

  const stats = useMemo(() => {
    const total = trucks.length;
    const active = trucks.filter((t) => t.status === 'active').length;
    const idle = trucks.filter((t) => t.status === 'idle').length;
    const maintenance = trucks.filter((t) => t.status === 'maintenance').length;

    const totalLoad = trucks.reduce((sum, t) => sum + t.currentLoad, 0);
    const totalCapacity = trucks.reduce((sum, t) => sum + t.capacity, 0);
    const avgLoadPercentage = totalCapacity > 0 ? (totalLoad / totalCapacity) * 100 : 0;

    const lowFuel = trucks.filter((t) => t.fuelLevel < 30).length;

    return {
      total,
      active,
      idle,
      maintenance,
      avgLoadPercentage: avgLoadPercentage.toFixed(1),
      lowFuel,
    };
  }, [trucks]);

  const statCards = [
    {
      title: 'Total Trucks',
      value: stats.total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Idle',
      value: stats.idle,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Maintenance',
      value: stats.maintenance,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: 'Avg Load',
      value: `${stats.avgLoadPercentage}%`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color: 'bg-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Low Fuel',
      value: stats.lowFuel,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of truck fleet monitoring
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold mt-2 ${stat.textColor}`}>
                  {loading ? '...' : stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg bg-opacity-10`}>
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Chart />
      </div>

      <FuelConsumptionChart />

      {/* Data Table */}
      <DataTable />
    </div>
  );
};

export default Dashboard;
