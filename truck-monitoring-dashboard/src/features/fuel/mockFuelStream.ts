import type { AppDispatch } from '../../app/store';
import { addFuelSample } from './fuelHistorySlice';
import type { Truck } from '../../api/mockData';

let timer: ReturnType<typeof setInterval> | null = null;

export const startMockFuelStream = (
  dispatch: AppDispatch,
  trucks: Truck[],
  opts?: { intervalMs?: number; stepPct?: number; refillThreshold?: number }
) => {
  stopMockFuelStream();
  const intervalMs = opts?.intervalMs ?? 3000;
  const stepPct = opts?.stepPct ?? 1.5; // reduce 1.5% per tick
  const refillThreshold = opts?.refillThreshold ?? 10; // refill when <10%

  // local mutable state per truck id
  const levels = new Map<string, number>();
  const dir = new Map<string, -1 | 1>(); // -1 draining, 1 refilling

  const now = Date.now();
  trucks.forEach((t) => {
    levels.set(t.id, typeof t.fuelLevel === 'number' ? t.fuelLevel : 100);
    dir.set(t.id, -1);
    dispatch(addFuelSample({ truckId: t.id, timestamp: now, fuelLevel: levels.get(t.id)! }));
  });

  timer = setInterval(() => {
    const ts = Date.now();
    trucks.forEach((t) => {
      const current = levels.get(t.id) ?? 100;
      const direction = dir.get(t.id) ?? -1;
      let next = current + direction * -stepPct; // draining decreases
      if (direction === 1) next = current + stepPct; // refilling increases

      if (direction === -1 && next <= refillThreshold) {
        dir.set(t.id, 1);
        next = refillThreshold; // start refilling from threshold
      } else if (direction === 1 && next >= 100) {
        dir.set(t.id, -1);
        next = 100;
      }

      levels.set(t.id, Math.max(0, Math.min(100, next)));
      dispatch(addFuelSample({ truckId: t.id, timestamp: ts, fuelLevel: levels.get(t.id)! }));
    });
  }, intervalMs);
};

export const stopMockFuelStream = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};
