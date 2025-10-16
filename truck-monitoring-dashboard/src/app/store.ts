import { configureStore } from '@reduxjs/toolkit';
import trucksReducer from '../features/trucks/trucksSlice';
import authReducer from '../features/auth/authSlice';
import fuelHistoryReducer from '../features/fuel/fuelHistorySlice';

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    auth: authReducer,
    fuelHistory: fuelHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
