import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', form);
      login(res.data.user, res.data.token);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.sub}>Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type='email' name='email' placeholder='you@example.com' value={form.email} onChange={handleChange} required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type='password' name='password' placeholder='••••••••' value={form.password} onChange={handleChange} required />
          </div>
          <button style={styles.btn} type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.footer}>Don't have an account? <Link to='/register' style={styles.link}>Register</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' },
  card: { background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.3rem' },
  sub: { color: '#888', marginBottom: '1.5rem' },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '500', color: '#444' },
  input: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' },
  btn: { width: '100%', padding: '0.85rem', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
  footer: { textAlign: 'center', marginTop: '1.2rem', color: '#666' },
  link: { color: '#e94560', fontWeight: '500' }
};

export default LoginPage;