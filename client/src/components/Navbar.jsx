import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to='/' style={styles.brand}>EventBook</Link>
      <div style={styles.links}>
        <Link to='/' style={styles.link}>Events</Link>
        {user ? (
          <>
            <Link to='/dashboard' style={styles.link}>My Bookings</Link>
            {user.role === 'admin' && (
              <Link to='/admin' style={styles.link}>Admin</Link>
            )}
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login' style={styles.link}>Login</Link>
            <Link to='/register' style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#1a1a2e', color: '#fff' },
  brand: { color: '#e94560', fontWeight: 'bold', fontSize: '1.4rem', textDecoration: 'none' },
  links: { display: 'flex', gap: '1.2rem', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
  btn: { background: '#e94560', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }
};

export default Navbar;