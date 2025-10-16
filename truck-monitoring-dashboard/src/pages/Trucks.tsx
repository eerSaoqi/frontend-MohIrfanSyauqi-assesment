import TruckTable from '../features/trucks/components/TruckTable';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateTruckInState } from '../features/trucks/trucksSlice';
import { useState } from 'react';
import AddTruckForm from '../features/trucks/components/AddTruckForm';

const Trucks = () => {
  const dispatch = useAppDispatch();
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

  useWebSocket({
    url: wsUrl,
    onMessage: (data) => {
      if (data && data.type === 'truck_update' && data.truck) {
        dispatch(updateTruckInState(data.truck));
      }
    },
  });
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trucks</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and monitor your truck fleet
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Truck
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 z-60">
            <h3 className="text-lg font-semibold mb-4">Add Truck</h3>
            <AddTruckForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Truck table */}
      <TruckTable />
    </div>
  );
};

export default Trucks;
