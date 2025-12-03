const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Public
const getBuses = asyncHandler(async (req, res) => {
  const { type, from, to, date } = req.query;
  console.log(type,from,to,date)

  const where = {};

  if (type && type !== 'All') {
    if (type === 'AC') {
      // If user selects "AC", we want "AC Seater" or "AC Sleeper" but NOT "Non-AC"
      // Since "Non-AC" contains "AC", a simple contains search matches both.
      // We need to explicitly filter out "Non-AC".
      where.AND = [
        { type: { contains: 'AC', mode: 'insensitive' } },
        { type: { not: { contains: 'Non-AC', mode: 'insensitive' } } }
      ];
    } else {
      where.type = {
        contains: type,
        mode: 'insensitive',
      };
    }
  }

  if (from) {
    where.source = {
      contains: from,
      mode: 'insensitive',
    };
  }

  if (to) {
    where.destination = {
      contains: to,
      mode: 'insensitive',
    };
  }

  if (date) {
    where.date = date;
  }

  console.log('Query Params:', { type, from, to, date });
  console.log('Constructed Where:', JSON.stringify(where, null, 2));

  try {
    const buses = await prisma.bus.findMany({
      where,
    });
    res.json(buses);
  } catch (error) {
    console.error('Error in getBuses:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});

// @desc    Get bus by ID
// @route   GET /api/buses/:id
// @access  Public
const getBusById = asyncHandler(async (req, res) => {
  const bus = await prisma.bus.findUnique({
    where: { id: req.params.id },
  });

  if (bus) {
    // Fetch all active bookings for this bus
    const bookings = await prisma.booking.findMany({
      where: {
        busId: req.params.id,
        status: { not: 'Cancelled' },
      },
      select: { seatNumbers: true },
    });

    // Flatten the array of seat numbers
    const bookedSeats = bookings.flatMap((b) => b.seatNumbers);

    res.json({ ...bus, bookedSeats });
  } else {
    res.status(404);
    throw new Error('Bus not found');
  }
});

// @desc    Create a bus
// @route   POST /api/buses
// @access  Private (Admin)
const createBus = asyncHandler(async (req, res) => {
  const { name, type, basePrice, departure, arrival, seatsAvailable, source, destination } = req.body;

  const bus = await prisma.bus.create({
    data: {
      name,
      type,
      basePrice,
      departure,
      arrival,
      seatsAvailable,
      source: source || "Unknown",
      destination: destination || "Unknown",
    },
  });

  res.status(201).json(bus);
});

module.exports = {
  getBuses,
  getBusById,
  createBus,
};
