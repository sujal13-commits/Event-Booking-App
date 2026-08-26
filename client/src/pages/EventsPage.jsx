import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const categories = ['all', 'music', 'sports', 'tech', 'food', 'art', 'other'];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events');
        setEvents(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = events;
    if (category !== 'all') result = result.filter(e => e.category === category);
    if (search) result = result.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [category, search, events]);

  if (loading) return <div style={styles.center}>Loading events...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Events</h1>
        <p style={styles.heroSub}>Find and book events happening around you</p>
        <input
          style={styles.search}
          type='text'
          placeholder='Search events...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.container}>
        <div style={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              style={{ ...styles.catBtn, ...(category === cat ? styles.catActive : {}) }}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={styles.center}>No events found</div>
        ) : (
          <div style={styles.grid}>
            {filtered.map(event => (
              <div key={event._id} style={styles.card} onClick={() => navigate(`/events/${event._id}`)}>
                <div style={styles.cardImg}>
                  <span style={styles.catTag}>{event.category}</span>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{event.title}</h3>
                  <p style={styles.cardDesc}>{event.description.slice(0, 80)}...</p>
                  <div style={styles.cardMeta}>
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <div style={styles.cardFooter}>
                    <span style={styles.capacity}>👥 {event.capacity} seats</span>
                    <button style={styles.viewBtn}>View Details</button>
                  </div>
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
  page: { minHeight: '90vh' },
  hero: { background: '#1a1a2e', color: '#fff', padding: '3rem 2rem', textAlign: 'center' },
  heroTitle: { fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' },
  heroSub: { color: '#aaa', marginBottom: '1.5rem' },
  search: { width: '100%', maxWidth: '500px', padding: '0.8rem 1.2rem', borderRadius: '30px', border: 'none', fontSize: '1rem', outline: 'none' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  categories: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' },
  catBtn: { padding: '0.5rem 1.2rem', borderRadius: '20px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.9rem', color: '#555' },
  catActive: { background: '#e94560', color: '#fff', border: '1px solid #e94560' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' },
  cardImg: { background: '#1a1a2e', height: '140px', display: 'flex', alignItems: 'flex-start', padding: '1rem', position: 'relative' },
  catTag: { background: '#e94560', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' },
  cardBody: { padding: '1.2rem' },
  cardTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '0.5rem' },
  cardDesc: { color: '#666', fontSize: '0.9rem', marginBottom: '0.8rem', lineHeight: '1.5' },
  cardMeta: { display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#888', marginBottom: '1rem' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  capacity: { fontSize: '0.85rem', color: '#555' },
  viewBtn: { background: '#e94560', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' },
  center: { textAlign: 'center', padding: '3rem', color: '#888' }
};

export default EventsPage;