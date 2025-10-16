# 🚛 Truck Monitoring Dashboard

Admin dashboard untuk pemantauan truk pengantar barang secara real-time. Dashboard ini menampilkan data truk (lokasi, status, pengemudi, kapasitas, waktu terakhir terlihat), statistik pengiriman, dan pengaturan sistem.

## ✨ Fitur

- **Dashboard Overview**: Ringkasan statistik fleet management
- **Real-time Monitoring**: Pemantauan status truk secara real-time
- **Data Table**: Daftar truk dengan server-side pagination, sorting, dan filtering
- **Charts**: Visualisasi grafik pengiriman harian menggunakan Chart.js
- **Dark/Light Mode**: Toggle tema dengan localStorage persistence
- **Responsive Design**: Desain modern dan responsif untuk semua perangkat
- **Form Validation**: Form dengan validasi menggunakan React Hook Form + Yup
- **State Management**: Redux Toolkit untuk state management yang efisien
- **Accessibility**: Sesuai standar WCAG 2.1 Level AA

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form + Yup
- **Charts**: Chart.js (react-chartjs-2)
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Real-time**: WebSocket (custom hook)

## 📁 Struktur Folder

```
src/
├── api/                    # API services & mock data
│   ├── axiosInstance.ts   # Axios configuration with interceptors
│   ├── mockData.ts        # Mock data untuk development
│   └── trucksApi.ts       # API endpoints untuk trucks
├── app/
│   └── store.ts           # Redux store configuration
├── features/
│   ├── trucks/
│   │   ├── trucksSlice.ts
│   │   └── components/
│   │       ├── TruckTable.tsx
│   │       └── 
│   └── auth/
│       └── authSlice.ts
├── hooks/
│   ├── useDarkMode.ts     # Dark mode hook
│   ├── useWebSocket.ts    # WebSocket hook
│   └── useAppDispatch.ts  # Typed Redux hooks
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   ├── Chart.tsx
│   └── DataTable.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Trucks.tsx
│   ├── Settings.tsx
│   └── Login.tsx
└── styles/
    └── index.css          # Global styles with Tailwind
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js (v18 atau lebih baru)
- npm atau yarn

### Installation

1. Clone atau download proyek ini

2. Install dependencies:
```bash
npm install
```

3. (Opsional) Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser dan akses `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`.

### Preview Production Build

```bash
npm run preview
```

## 📊 Data & API

Saat ini aplikasi menggunakan **mock data** yang tersimpan di `src/api/mockData.ts`. Untuk integrasi dengan backend real:

1. Buat backend API dengan endpoint:
   - `GET /api/trucks` - Fetch trucks dengan pagination & filtering
   - `GET /api/trucks/:id` - Fetch single truck
   - `POST /api/trucks` - Create truck
   - `PUT /api/trucks/:id` - Update truck
   - `DELETE /api/trucks/:id` - Delete truck
   - `GET /api/trucks/stats/deliveries` - Fetch delivery statistics

2. Update `USE_MOCK` di `src/api/trucksApi.ts` menjadi `false`

3. Set `VITE_API_URL` di file `.env` ke backend URL Anda

## 🎨 Dark Mode

Dark mode dapat diaktifkan melalui:
- Toggle di header (ikon sun/moon)
- Pengaturan tersimpan di localStorage
- Otomatis detect system preference saat pertama kali load

## 🔐 Authentication

Demo credentials untuk login:
- Email: `admin@truckmon.com`
- Password: `admin`

**Note**: Untuk demo, authentication di-bypass. Di production, aktifkan authentication dengan mengubah `mockAuth` di `App.tsx`.

## 🧪 Features Highlights

### 1. State Management dengan Redux Toolkit
- Async thunk untuk API calls
- Caching mechanism (5 menit)
- Loading & error state management

### 2. Form Validation
- React Hook Form untuk performa optimal
- Yup schema validation
- Error messages yang user-friendly

### 3. Axios Interceptors
- Auto refresh token pada 401 error
- Retry mechanism untuk network errors
- Authorization header injection

### 4. WebSocket Support
- Custom `useWebSocket` hook
- Auto-reconnect mechanism
- Real-time updates untuk posisi truk

### 5. Accessibility
- Semantic HTML elements
- ARIA labels & roles
- Keyboard navigation
- Color contrast sesuai WCAG 2.1 AA

## 🔧 Konfigurasi

### Tailwind CSS

Konfigurasi Tailwind dapat diubah di `tailwind.config.js`. Custom colors dan theme extensions sudah disediakan.

### TypeScript

Konfigurasi TypeScript tersedia di:
- `tsconfig.json` - Base config
- `tsconfig.app.json` - App config
- `tsconfig.node.json` - Node config

## 📝 License

MIT License - silakan gunakan untuk proyek komersial maupun personal.

## 🤝 Contributing

Contributions, issues, dan feature requests sangat diterima!

---

Made with ❤️ for efficient fleet management
