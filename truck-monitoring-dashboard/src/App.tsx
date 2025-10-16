import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/useAppDispatch';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Trucks from './pages/Trucks';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Drivers from './pages/Drivers';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Mock authentication - in production, check real auth state
  // For demo, we'll allow access without login
  const mockAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {mockAuth || isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="trucks" element={<Trucks />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
