export interface Driver {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  licenseNumber?: string;
  photoUrl?: string;
  address?: string;
}

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    phone: '+62 812-3456-7890',
    email: 'budi.s@example.com',
    licenseNumber: 'SIM-A-123456',
  photoUrl: 'https://i.pravatar.cc/150?img=1',
    address: 'Jl. Merdeka No.10, Jakarta Pusat',
  },
  {
    id: '2',
    name: 'Ahmad Hidayat',
    phone: '+62 813-9876-5432',
    email: 'ahmad.h@example.com',
    licenseNumber: 'SIM-A-654321',
  photoUrl: 'https://i.pravatar.cc/150?img=2',
    address: 'Jl. Sudirman No.5, Jakarta Timur',
  },
  {
    id: '3',
    name: 'Siti Rahma',
    phone: '+62 821-1111-2222',
    email: 'siti.r@example.com',
    licenseNumber: 'SIM-B-111222',
  photoUrl: 'https://i.pravatar.cc/150?img=3',
    address: 'Jl. Kebayoran Baru, Jakarta Selatan',
  },
  {
    id: '4',
    name: 'Andi Wijaya',
    phone: '+62 822-3333-4444',
    email: 'andi.w@example.com',
    licenseNumber: 'SIM-A-333444',
  photoUrl: 'https://i.pravatar.cc/150?img=4',
    address: 'Jakarta Barat',
  },
  {
    id: '5',
    name: 'Rina Putri',
    phone: '+62 813-2222-3333',
    email: 'rina.p@example.com',
    licenseNumber: 'SIM-A-555666',
  photoUrl: 'https://i.pravatar.cc/150?img=5',
    address: 'Jakarta Utara',
  },
  {
    id: '6',
    name: 'Dedi Kurniawan',
    phone: '+62 815-4444-5555',
    email: 'dedi.k@example.com',
    licenseNumber: 'SIM-A-777888',
  photoUrl: 'https://i.pravatar.cc/150?img=6',
    address: 'Bandung, Jawa Barat',
  },
  {
    id: '7',
    name: 'Hendra Setiawan',
    phone: '+62 816-6666-7777',
    email: 'hendra.s@example.com',
    licenseNumber: 'SIM-B-999000',
  photoUrl: 'https://i.pravatar.cc/150?img=7',
    address: 'Surabaya, Jawa Timur',
  },
  {
    id: '8',
    name: 'Wati Kusuma',
    phone: '+62 817-8888-9999',
    email: 'wati.k@example.com',
    licenseNumber: 'SIM-A-121212',
  photoUrl: 'https://i.pravatar.cc/150?img=8',
    address: 'Tangerang, Banten',
  },
];
