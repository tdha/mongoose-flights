const Flight = require('../models/flight');
// const Ticket = require('../models/tickets');

module.exports = {
  create
};

async function index(req, res) {
    try {
      const flights = await Flight.find({}).sort({ arrival: 'asc' });
      res.render('flights/index', { flights });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving flights from database');
    }
  }

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  flight.destinations.push(req.body);
  try {
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}