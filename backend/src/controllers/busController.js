const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Public
const getBuses = asyncHandler(async (req, res) => {
  const { type, from, to, date } = req.query;

  const where = {};

  if (type && type !== 'All') {
    where.type = {
      contains: type,
      mode: 'insensitive',
    };
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

  const buses = await prisma.bus.findMany({
    where,
  });

  res.json(buses);
});

// @desc    Get bus by ID
// @route   GET /api/buses/:id
// @access  Public
const getBusById = asyncHandler(async (req, res) => {
  const bus = await prisma.bus.findUnique({
    where: { id: req.params.id },
  });

  if (bus) {
    res.json(bus);
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
