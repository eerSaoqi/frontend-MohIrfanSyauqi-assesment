import { useState } from 'react';
import { mockDrivers } from '../api/mockDrivers';
import type { Driver } from '../api/mockDrivers';
import DriverDetail from '../components/DriverDetail';
import AddDriverForm from '../components/AddDriverForm';
import { useEffect } from 'react';

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [selected, setSelected] = useState<Driver | null>(null);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    // keep local copy in sync if mockDrivers changes during development
    setDrivers(mockDrivers);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Drivers</h1>
      </div>

      <div className="flex items-center justify-between">
        <div />
        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
          Add Driver
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{d.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{d.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{d.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{d.licenseNumber}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => { setSelected(d); setOpen(true); }}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

        <DriverDetail driver={selected} open={open} onClose={() => setOpen(false)} />

        {addOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={() => setAddOpen(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 z-60">
              <h3 className="text-lg font-semibold mb-4">Add Driver</h3>
              <AddDriverForm
                onClose={() => setAddOpen(false)}
                onAdd={(d) => setDrivers((prev) => [d, ...prev])}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Drivers;
