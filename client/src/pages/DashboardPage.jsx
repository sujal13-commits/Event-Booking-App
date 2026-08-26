import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/bookings/my');
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.patch(`/bookings/cancel/${id}`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return <div style={styles.center}>Loading your bookings...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.title}>My Bookings</h1>
        <p style={styles.sub}>Welcome back, {user?.name}!</p>
      </div>
      <div style={styles.container}>
        {bookings.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>You have no bookings yet!</p>
            <button style={styles.browseBtn} onClick={() => navigate('/')}>
              Browse Events
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {bookings.map(booking => (
              <div key={booking._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.catTag}>{booking.event?.category}</span>
                  <span style={{
                    ...styles.statusTag,
                    background: booking.status === 'confirmed' ? '#e8f5e9' : '#fce4ec',
                    color: booking.status === 'confirmed' ? '#2e7d32' : '#c62828'
                  }}>
                    {booking.status === 'confirmed' ? '✓ Confirmed' : '✗ Cancelled'}
                  </span>
                </div>
                <h3 style={styles.eventTitle}>{booking.event?.title}</h3>
                <div style={styles.meta}>
                  <span>📅 {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : 'N/A'}</span>
                  <span>📍 {booking.event?.location}</span>
                </div>
                <div style={styles.cardFooter}>
                  <span style={styles.bookedOn}>
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                  {booking.status === 'confirmed' && (
                    <button style={styles.cancelBtn} onClick={() => handleCancel(booking._id)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '90vh', background: '#f5f5f5' },
  hero: { background: '#1a1a2e', color: '#fff', padding: '2.5rem 2rem' },
  title: { fontSize: '2rem', fontWeight: '700', marginBottom: '0.4rem' },
  sub: { color: '#aaa' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
  card: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' },
  catTag: { background: '#e94560', color: '#fff', padding: '0.25rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' },
  statusTag: { padding: '0.25rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' },
  eventTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '0.8rem' },
  meta: { display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.88rem', color: '#777', marginBottom: '1rem' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '0.8rem' },
  bookedOn: { fontSize: '0.8rem', color: '#aaa' },
  cancelBtn: { background: '#fce4ec', color: '#c62828', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' },
  empty: { textAlign: 'center', padding: '4rem 2rem' },
  emptyText: { fontSize: '1.2rem', color: '#888', marginBottom: '1.5rem' },
  browseBtn: { background: '#e94560', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
  center: { textAlign: 'center', padding: '3rem', color: '#888' }
};

export default DashboardPage;