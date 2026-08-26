const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', auth, adminOnly, createEvent);
router.put('/:id', auth, adminOnly, updateEvent);
router.delete('/:id', auth, adminOnly, deleteEvent);

module.exports = router;