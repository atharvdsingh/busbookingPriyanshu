const express = require('express');
const router = express.Router();
const { getBuses, getBusById, createBus } = require('../controllers/busController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(getBuses).post(protect, createBus);
router.route('/:id').get(getBusById);

module.exports = router;
