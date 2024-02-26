const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations');

// POST /movies/:id/reviews (create review for a movie)
router.post('/flights/:id/destinations', destinationsController.create);

module.exports = router;