const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { busId, seatNumbers, totalPrice, date } = req.body;
  console.log(busId, seatNumbers, totalPrice, date);

  if (!seatNumbers || seatNumbers.length === 0) {
    res.status(400);
    throw new Error('No seats selected');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  // Check for double booking
  const existingBookings = await prisma.booking.findMany({
    where: {
      busId,
      status: { not: 'Cancelled' },
    },
    select: { seatNumbers: true },
  });

  const allBookedSeats = existingBookings.flatMap((b) => b.seatNumbers);
  const isDoubleBooked = seatNumbers.some((seat) => allBookedSeats.includes(seat));

  if (isDoubleBooked) {
    res.status(400);
    throw new Error('One or more selected seats are already booked');
  }

  console.log('User creating booking:', req.user.id);

  const booking = await prisma.booking.create({
    data: {
      userId: req.user.id,
      busId,
      seatNumbers,
      totalPrice,
      date: new Date(date),
      status: 'Confirmed',
    },
  });

  // Update seats availability
  await prisma.bus.update({
    where: { id: busId },
    data: {
      seatsAvailable: {
        decrement: seatNumbers.length,
      },
    },
  });

  res.status(201).json(booking);
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.id },
    include: {
      bus: true,
    },
  });

  res.json(bookings);
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
  });

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.userId !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: req.params.id },
    data: { status: 'Cancelled' },
  });

  res.json(updatedBooking);
});

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};
