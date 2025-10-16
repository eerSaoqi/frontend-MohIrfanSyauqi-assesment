export interface Truck {
  id: string;
  driver: string;
  plateNumber: string;
  capacity: number;
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  photoUrl?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  lastSeen: string;
  currentLoad: number;
  fuelLevel: number;
}

export const mockTrucks: Truck[] = [
  {
    id: '1',
    driver: 'Budi Santoso',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'B 1234 ABC',
    capacity: 5000,
    status: 'active',
    location: {
      lat: -6.2088,
      lng: 106.8456,
      address: 'Jakarta Pusat, DKI Jakarta',
    },
    lastSeen: new Date().toISOString(),
    currentLoad: 3500,
    fuelLevel: 75,
  },
  {
    id: '2',
    driver: 'Ahmad Hidayat',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'B 5678 DEF',
    capacity: 7000,
    status: 'active',
    location: {
      lat: -6.1751,
      lng: 106.8650,
      address: 'Jakarta Timur, DKI Jakarta',
    },
    lastSeen: new Date(Date.now() - 5 * 60000).toISOString(),
    currentLoad: 6800,
    fuelLevel: 60,
  },
  {
    id: '3',
    driver: 'Siti Rahma',
    photoUrl: 'https://images.unsplash.com/photo-1531123414780-f9f2b9a8f2b3?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'B 9012 GHI',
    capacity: 3000,
    status: 'idle',
    location: {
      lat: -6.2297,
      lng: 106.8320,
      address: 'Jakarta Selatan, DKI Jakarta',
    },
    lastSeen: new Date(Date.now() - 15 * 60000).toISOString(),
    currentLoad: 0,
    fuelLevel: 90,
  },
  {
    id: '4',
    driver: 'Andi Wijaya',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'B 3456 JKL',
    capacity: 10000,
    status: 'active',
    location: {
      lat: -6.1862,
      lng: 106.7980,
      address: 'Jakarta Barat, DKI Jakarta',
    },
    lastSeen: new Date().toISOString(),
    currentLoad: 9500,
    fuelLevel: 45,
  },
  {
    id: '5',
    driver: 'Rina Putri',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'B 7890 MNO',
    capacity: 5000,
    status: 'maintenance',
    location: {
      lat: -6.1389,
      lng: 106.8133,
      address: 'Jakarta Utara, DKI Jakarta',
    },
    lastSeen: new Date(Date.now() - 120 * 60000).toISOString(),
    currentLoad: 0,
    fuelLevel: 25,
  },
  {
    id: '6',
    driver: 'Dedi Kurniawan',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'D 1122 PQR',
    capacity: 8000,
    status: 'active',
    location: {
      lat: -6.9175,
      lng: 107.6191,
      address: 'Bandung, Jawa Barat',
    },
    lastSeen: new Date(Date.now() - 2 * 60000).toISOString(),
    currentLoad: 5000,
    fuelLevel: 70,
  },
  {
    id: '7',
    driver: 'Hendra Setiawan',
    photoUrl: 'https://images.unsplash.com/photo-1545996124-1ec1d51f7c1d?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'L 3344 STU',
    capacity: 6000,
    status: 'offline',
    location: {
      lat: -7.7956,
      lng: 110.3695,
      address: 'Surabaya, Jawa Timur',
    },
    lastSeen: new Date(Date.now() - 180 * 60000).toISOString(),
    currentLoad: 4000,
    fuelLevel: 20,
  },
  {
    id: '8',
    driver: 'Wati Kusuma',
    photoUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop',
    plateNumber: 'B 5566 VWX',
    capacity: 4500,
    status: 'active',
    location: {
      lat: -6.2615,
      lng: 106.7810,
      address: 'Tangerang, Banten',
    },
    lastSeen: new Date().toISOString(),
    currentLoad: 3000,
    fuelLevel: 85,
  },
];

export const mockDeliveryStats = [
  { date: '2025-10-08', deliveries: 45, onTime: 42, delayed: 3 },
  { date: '2025-10-09', deliveries: 52, onTime: 48, delayed: 4 },
  { date: '2025-10-10', deliveries: 38, onTime: 36, delayed: 2 },
  { date: '2025-10-11', deliveries: 61, onTime: 58, delayed: 3 },
  { date: '2025-10-12', deliveries: 49, onTime: 45, delayed: 4 },
  { date: '2025-10-13', deliveries: 55, onTime: 53, delayed: 2 },
  { date: '2025-10-14', deliveries: 58, onTime: 55, delayed: 3 },
];
