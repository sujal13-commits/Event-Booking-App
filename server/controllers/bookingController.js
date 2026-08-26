const Booking = require('../models/Booking');
const Event = require('../models/Event');

const createBooking = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existingBooking = await Booking.findOne({ user: req.user.id, event: req.params.eventId });
    if (existingBooking) return res.status(400).json({ message: 'You already booked this event' });

    const bookingCount = await Booking.countDocuments({ event: req.params.eventId, status: 'confirmed' });
    if (bookingCount >= event.capacity) return res.status(400).json({ message: 'Event is fully booked' });

    const booking = await Booking.create({ user: req.user.id, event: req.params.eventId });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking };