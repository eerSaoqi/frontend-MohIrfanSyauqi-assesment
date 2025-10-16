import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchTrucks, setFilters, setPage } from '../features/trucks/trucksSlice';
import DriverDetail from './DriverDetail';
import { mockDrivers } from '../api/mockDrivers';
import type { Driver } from '../api/mockDrivers';

const DataTable = () => {
  const dispatch = useAppDispatch();
  const { trucks, loading, error, total, page, pageSize, filters } = useAppSelector(
    (state) => state.trucks
  );

  const [searchInput, setSearchInput] = useState(filters.search);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTrucks({ 
      page, 
      pageSize, 
      sort: filters.sort,
      search: filters.search,
      status: filters.status,
    }));
  }, [dispatch, page, pageSize, filters]);

  const handleSearch = () => {
    dispatch(setFilters({ search: searchInput }));
    dispatch(setPage(1));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setFilters({ status }));
    dispatch(setPage(1));
  };

  const handleSort = (field: string) => {
    const currentSort = filters.sort;
    const [currentField, currentOrder] = currentSort.split(':');
    
    let newSort = `${field}:asc`;
    if (currentField === field && currentOrder === 'asc') {
      newSort = `${field}:desc`;
    }
    
    dispatch(setFilters({ sort: newSort }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'offline':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const formatLastSeen = (lastSeen: string) => {
    const now = new Date();
    const last = new Date(lastSeen);
    const diffMs = now.getTime() - last.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Trucks ({total})
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search trucks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="input text-sm"
              aria-label="Search trucks"
            />
            <button
              onClick={handleSearch}
              className="btn btn-primary px-4 py-2"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Status filter */}
          <select
            value={filters.status}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="input text-sm"
            aria-label="Filter by status"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-lg" role="alert">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('driver')}
                  className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <span>Driver</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Plate Number
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Load/Capacity
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Seen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                </td>
              </tr>
            ) : trucks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No trucks found
                </td>
              </tr>
            ) : (
              trucks.map((truck) => (
                <tr key={truck.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {truck.photoUrl ? (
                          // eslint-disable-next-line jsx-a11y/img-redundant-alt
                          <img src={truck.photoUrl} alt={`Truck of ${truck.driver}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm text-gray-700 dark:text-gray-300">{truck.driver.split(' ').map(n=>n[0]).slice(0,2).join('')}</span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        <button
                          onClick={() => {
                            const d = mockDrivers.find((md) => md.name === truck.driver || md.id === truck.id);
                            setSelectedDriver(d || null);
                            setDriverModalOpen(true);
                          }}
                          className="text-left text-primary-600 hover:underline"
                          aria-label={`View ${truck.driver} details`}
                        >
                          {truck.driver}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      {truck.plateNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(truck.status)}`}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-300 max-w-xs truncate">
                      <a
                        href={`https://www.google.com/maps?q=${truck.location.lat},${truck.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                        title="Open in Google Maps"
                      >
                        {truck.location.address}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      {truck.currentLoad} / {truck.capacity} kg
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(truck.currentLoad / truck.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatLastSeen(truck.lastSeen)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

  {/* Driver detail modal */}
  <DriverDetail driver={selectedDriver} open={driverModalOpen} onClose={() => setDriverModalOpen(false)} />

  {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page === 1}
              className="btn btn-secondary px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => dispatch(setPage(pageNum))}
                    className={`px-3 py-1 rounded-lg ${
                      page === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={page === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => dispatch(setPage(page + 1))}
              disabled={page === totalPages}
              className="btn btn-secondary px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

