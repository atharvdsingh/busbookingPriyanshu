const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createBooking);
router.route('/my-bookings').get(protect, getMyBookings);
router.route('/:id/cancel').put(protect, cancelBooking);

module.exports = router;
