import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EventDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error('Event not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }
    setBooking(true);
    try {
      await axios.post(`/bookings/${id}`);
      toast.success('Event booked successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div style={styles.center}>Loading...</div>;
  if (!event) return null;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.catTag}>{event.category}</span>
          <h1 style={styles.title}>{event.title}</h1>
          <div style={styles.meta}>
            <span>📅 {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>📍 {event.location}</span>
            <span>👥 {event.capacity} seats available</span>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.left}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>About this event</h2>
              <p style={styles.desc}>{event.description}</p>
            </div>
          </div>

          <div style={styles.right}>
            <div style={styles.bookCard}>
              <h3 style={styles.bookTitle}>Reserve your spot</h3>
              <div style={styles.bookInfo}>
                <div style={styles.bookRow}>
                  <span style={styles.bookLabel}>Date</span>
                  <span style={styles.bookValue}>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div style={styles.bookRow}>
                  <span style={styles.bookLabel}>Location</span>
                  <span style={styles.bookValue}>{event.location}</span>
                </div>
                <div style={styles.bookRow}>
                  <span style={styles.bookLabel}>Category</span>
                  <span style={styles.bookValue}>{event.category}</span>
                </div>
                <div style={styles.bookRow}>
                  <span style={styles.bookLabel}>Capacity</span>
                  <span style={styles.bookValue}>{event.capacity} seats</span>
                </div>
              </div>
              <button style={styles.bookBtn} onClick={handleBook} disabled={booking}>
                {booking ? 'Booking...' : '🎟 Book Now'}
              </button>
              <button style={styles.backBtn} onClick={() => navigate('/')}>
                ← Back to Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '90vh', background: '#f5f5f5' },
  hero: { background: '#1a1a2e', color: '#fff', padding: '3rem 2rem' },
  heroContent: { maxWidth: '1200px', margin: '0 auto' },
  catTag: { background: '#e94560', color: '#fff', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.85rem' },
  title: { fontSize: '2.2rem', fontWeight: '700', margin: '1rem 0' },
  meta: { display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: '#aaa', fontSize: '0.95rem' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' },
  left: {},
  right: {},
  card: { background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  sectionTitle: { fontSize: '1.3rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '1rem' },
  desc: { color: '#555', lineHeight: '1.8', fontSize: '1rem' },
  bookCard: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: '1rem' },
  bookTitle: { fontSize: '1.2rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '1.2rem' },
  bookInfo: { marginBottom: '1.5rem' },
  bookRow: { display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #f0f0f0' },
  bookLabel: { color: '#888', fontSize: '0.9rem' },
  bookValue: { color: '#333', fontSize: '0.9rem', fontWeight: '500' },
  bookBtn: { width: '100%', padding: '0.9rem', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '0.8rem' },
  backBtn: { width: '100%', padding: '0.9rem', background: 'transparent', color: '#555', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', cursor: 'pointer' },
  center: { textAlign: 'center', padding: '3rem', color: '#888' }
};

export default EventDetailPage;