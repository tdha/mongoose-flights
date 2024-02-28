const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets');

// This router is mounted to a "starts with" path of '/'

// GET /tickets/new (new functionality)
// router.get('/tickets/new', ticketsController.new);
router.get('/flights/:id/tickets/new', ticketsController.new);

// POST /tickets (create functionality)
// router.post('/tickets', ticketsController.create);

// POST /flights/:id/tickets
router.post('/flights/:id/tickets', ticketsController.create);

module.exports = router;