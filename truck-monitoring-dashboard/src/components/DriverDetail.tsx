import React from 'react';
import type { Driver } from '../api/mockDrivers';

interface Props {
  driver: Driver | null;
  open: boolean;
  onClose: () => void;
}

const DriverDetail: React.FC<Props> = ({ driver, open, onClose }) => {
  if (!open || !driver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-60">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Driver Details</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
              {driver.photoUrl ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={driver.photoUrl} alt={`Photo of ${driver.name}`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 dark:text-gray-300">{driver.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</span>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{driver.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{driver.address}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
            <div className="font-medium">{driver.phone || '-'}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Email</div>
            <div className="font-medium">{driver.email || '-'}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">License</div>
            <div className="font-medium">{driver.licenseNumber || '-'}</div>
          </div>

        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;
