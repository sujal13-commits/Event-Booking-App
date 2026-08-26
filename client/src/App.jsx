import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position='top-right' />
        <Navbar />
        <Routes>
          <Route path='/' element={<EventsPage />} />
          <Route path='/events/:id' element={<EventDetailPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;