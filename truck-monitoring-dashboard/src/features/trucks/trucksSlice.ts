import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { trucksApi } from '../../api/trucksApi';
import type { FetchTrucksParams } from '../../api/trucksApi';
import type { Truck } from '../../api/mockData';

interface TrucksState {
  trucks: Truck[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
  filters: {
    search: string;
    status: string;
    sort: string;
  };
}

const initialState: TrucksState = {
  trucks: [],
  total: 0,
  page: 1,
  pageSize: 20,
  loading: false,
  error: null,
  lastFetch: null,
  filters: {
    search: '',
    status: '',
    sort: 'driver:asc',
  },
};

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchTrucks = createAsyncThunk(
  'trucks/fetchTrucks',
  async (params: FetchTrucksParams | undefined, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { trucks: TrucksState };
      const now = Date.now();

      // Check cache - skip fetch if data is fresh and no new params
      if (
        state.trucks.lastFetch &&
        now - state.trucks.lastFetch < CACHE_DURATION &&
        !params
      ) {
        return null; // Return null to indicate cached data is used
      }

      const response = await trucksApi.fetchTrucks(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trucks');
    }
  }
);

export const updateTruckLocation = createAsyncThunk(
  'trucks/updateLocation',
  async ({ id, location }: { id: string; location: Truck['location'] }, { rejectWithValue }) => {
    try {
      const response = await trucksApi.updateTruck(id, { location, lastSeen: new Date().toISOString() });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update truck location');
    }
  }
);

const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TrucksState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    addTruck: (state, action: PayloadAction<Truck>) => {
      // prepend new truck
      state.trucks.unshift(action.payload);
      state.total += 1;
    },
    updateTruckInState: (state, action: PayloadAction<Truck>) => {
      const index = state.trucks.findIndex(truck => truck.id === action.payload.id);
      if (index !== -1) {
        state.trucks[index] = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrucks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.trucks = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
          state.lastFetch = Date.now();
        }
      })
      .addCase(fetchTrucks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTruckLocation.fulfilled, (state, action) => {
        const index = state.trucks.findIndex(truck => truck.id === action.payload.id);
        if (index !== -1) {
          state.trucks[index] = action.payload;
        }
      });
  },
});

export const { setFilters, setPage, addTruck, updateTruckInState, clearError } = trucksSlice.actions;
export default trucksSlice.reducer;
