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
    // Basic filter, in real app might need more complex logic
    // Assuming 'departure' stores city or we have a route model
    // For now, let's assume client filters by city or we add source/dest fields to Bus model
    // Since schema has departure/arrival as String (time), we might need to adjust schema or logic
    // For this MVP, let's return all and let frontend filter or assume basic filtering if fields existed
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
  const { name, type, basePrice, departure, arrival, seatsAvailable } = req.body;

  const bus = await prisma.bus.create({
    data: {
      name,
      type,
      basePrice,
      departure,
      arrival,
      seatsAvailable,
    },
  });

  res.status(201).json(bus);
});

module.exports = {
  getBuses,
  getBusById,
  createBus,
};
