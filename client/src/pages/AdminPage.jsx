import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const emptyForm = { title: '', description: '', date: '', location: '', category: 'tech', capacity: '' };

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('Admin access only');
      navigate('/');
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      setEvents(res.data);
    } catch (err) {
      toast.error('Failed to load events');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`/events/${editId}`, form);
        toast.success('Event updated!');
        setEditId(null);
      } else {
        await axios.post('/events', form);
        toast.success('Event created!');
      }
      setForm(emptyForm);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      location: event.location,
      category: event.category,
      capacity: event.capacity
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await axios.delete(`/events/${id}`);
      toast.success('Event deleted');
      fetchEvents();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Admin Panel</h1>
        <p style={styles.sub}>Manage your events</p>
      </div>

      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.formCard}>
            <h2 style={styles.sectionTitle}>{editId ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.field}>
                <label style={styles.label}>Title</label>
                <input style={styles.input} name='title' value={form.title} onChange={handleChange} placeholder='Event title' required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Description</label>
                <textarea style={{ ...styles.input, height: '100px', resize: 'vertical' }} name='description' value={form.description} onChange={handleChange} placeholder='Event description' required />
              </div>
              <div style={styles.row}>
                <div style={{ ...styles.field, flex: 1 }}>
                  <label style={styles.label}>Date</label>
                  <input style={styles.input} type='date' name='date' value={form.date} onChange={handleChange} required />
                </div>
                <div style={{ ...styles.field, flex: 1 }}>
                  <label style={styles.label}>Capacity</label>
                  <input style={styles.input} type='number' name='capacity' value={form.capacity} onChange={handleChange} placeholder='100' required />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Location</label>
                <input style={styles.input} name='location' value={form.location} onChange={handleChange} placeholder='Mumbai, India' required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Category</label>
                <select style={styles.input} name='category' value={form.category} onChange={handleChange}>
                  {['music', 'sports', 'tech', 'food', 'art', 'other'].map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div style={styles.btnRow}>
                <button style={styles.submitBtn} type='submit' disabled={loading}>
                  {loading ? 'Saving...' : editId ? 'Update Event' : 'Create Event'}
                </button>
                {editId && (
                  <button style={styles.cancelBtn} type='button' onClick={() => { setEditId(null); setForm(emptyForm); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h2 style={styles.sectionTitle}>All Events ({events.length})</h2>
            <div style={styles.eventList}>
              {events.map(event => (
                <div key={event._id} style={styles.eventCard}>
                  <div style={styles.eventInfo}>
                    <span style={styles.catTag}>{event.category}</span>
                    <h3 style={styles.eventTitle}>{event.title}</h3>
                    <p style={styles.eventMeta}>📅 {new Date(event.date).toLocaleDateString()} · 📍 {event.location} · 👥 {event.capacity} seats</p>
                  </div>
                  <div style={styles.actionBtns}>
                    <button style={styles.editBtn} onClick={() => handleEdit(event)}>Edit</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(event._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
  formCard: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', height: 'fit-content' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '1.2rem' },
  field: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '500', color: '#444', fontSize: '0.9rem' },
  input: { width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' },
  row: { display: 'flex', gap: '1rem' },
  btnRow: { display: 'flex', gap: '0.8rem', marginTop: '0.5rem' },
  submitBtn: { flex: 1, padding: '0.8rem', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' },
  cancelBtn: { padding: '0.8rem 1.2rem', background: '#f5f5f5', color: '#555', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', cursor: 'pointer' },
  eventList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  eventCard: { background: '#fff', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  eventInfo: { flex: 1 },
  catTag: { background: '#e94560', color: '#fff', padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem' },
  eventTitle: { fontSize: '1rem', fontWeight: '600', color: '#1a1a2e', margin: '0.4rem 0 0.2rem' },
  eventMeta: { fontSize: '0.82rem', color: '#888' },
  actionBtns: { display: 'flex', gap: '0.5rem', marginLeft: '1rem' },
  editBtn: { padding: '0.4rem 1rem', background: '#e3f2fd', color: '#1565c0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' },
  deleteBtn: { padding: '0.4rem 1rem', background: '#fce4ec', color: '#c62828', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }
};

export default AdminPage;