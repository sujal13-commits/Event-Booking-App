const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking } = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');

router.post('/:eventId', auth, createBooking);
router.get('/my', auth, getMyBookings);
router.patch('/cancel/:id', auth, cancelBooking);

module.exports = router;