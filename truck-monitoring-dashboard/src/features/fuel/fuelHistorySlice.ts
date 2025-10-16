import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FuelSample {
  timestamp: number;
  fuelLevel: number;
}

export interface FuelHistoryState {
  byTruckId: Record<string, FuelSample[]>;
  maxSamples: number;
}

const initialState: FuelHistoryState = {
  byTruckId: {},
  maxSamples: 600,
};

const fuelHistorySlice = createSlice({
  name: 'fuelHistory',
  initialState,
  reducers: {
    addFuelSample: (
      state,
      action: PayloadAction<{ truckId: string; timestamp: number; fuelLevel: number }>
    ) => {
      const { truckId, timestamp, fuelLevel } = action.payload;
      if (!state.byTruckId[truckId]) state.byTruckId[truckId] = [];
      const arr = state.byTruckId[truckId];
      arr.push({ timestamp, fuelLevel });
      if (arr.length > state.maxSamples) arr.splice(0, arr.length - state.maxSamples);
    },
    clearFuelHistory: (state, action: PayloadAction<{ truckId?: string }>) => {
      const { truckId } = action.payload;
      if (truckId) delete state.byTruckId[truckId];
      else state.byTruckId = {};
    },
  },
});

export const { addFuelSample, clearFuelHistory } = fuelHistorySlice.actions;
export default fuelHistorySlice.reducer;
