import axiosInstance from './axiosInstance';
import type { Truck } from './mockData';
import { mockTrucks, mockDeliveryStats } from './mockData';

export interface FetchTrucksParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  status?: string;
}

export interface FetchTrucksResponse {
  data: Truck[];
  total: number;
  page: number;
  pageSize: number;
}

// Mock API - replace with real API calls in production
const USE_MOCK = true;

export const trucksApi = {
  fetchTrucks: async (params: FetchTrucksParams = {}): Promise<FetchTrucksResponse> => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const { page = 1, pageSize = 20, sort = 'driver:asc', search = '', status = '' } = params;

      let filteredTrucks = [...mockTrucks];

      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase();
        filteredTrucks = filteredTrucks.filter(
          truck =>
            truck.driver.toLowerCase().includes(searchLower) ||
            truck.plateNumber.toLowerCase().includes(searchLower) ||
            truck.location.address.toLowerCase().includes(searchLower)
        );
      }

      // Filter by status
      if (status) {
        filteredTrucks = filteredTrucks.filter(truck => truck.status === status);
      }

      // Sort
      const [sortField, sortOrder] = sort.split(':');
      filteredTrucks.sort((a, b) => {
        let aVal = a[sortField as keyof Truck];
        let bVal = b[sortField as keyof Truck];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });

      // Paginate
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedTrucks = filteredTrucks.slice(start, end);

      return {
        data: paginatedTrucks,
        total: filteredTrucks.length,
        page,
        pageSize,
      };
    }

    // Real API call
    const response = await axiosInstance.get<FetchTrucksResponse>('/trucks', { params });
    return response.data;
  },

  fetchTruckById: async (id: string): Promise<Truck> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const truck = mockTrucks.find(t => t.id === id);
      if (!truck) throw new Error('Truck not found');
      return truck;
    }

    const response = await axiosInstance.get<Truck>(`/trucks/${id}`);
    return response.data;
  },

  createTruck: async (truck: Omit<Truck, 'id'>): Promise<Truck> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTruck: Truck = {
        ...truck,
        id: String(mockTrucks.length + 1),
      };
      mockTrucks.push(newTruck);
      return newTruck;
    }

    const response = await axiosInstance.post<Truck>('/trucks', truck);
    return response.data;
  },

  updateTruck: async (id: string, truck: Partial<Truck>): Promise<Truck> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockTrucks.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Truck not found');
      mockTrucks[index] = { ...mockTrucks[index], ...truck };
      return mockTrucks[index];
    }

    const response = await axiosInstance.put<Truck>(`/trucks/${id}`, truck);
    return response.data;
  },

  deleteTruck: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockTrucks.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Truck not found');
      mockTrucks.splice(index, 1);
      return;
    }

    await axiosInstance.delete(`/trucks/${id}`);
  },

  fetchDeliveryStats: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDeliveryStats;
    }

    const response = await axiosInstance.get('/trucks/stats/deliveries');
    return response.data;
  },
};
