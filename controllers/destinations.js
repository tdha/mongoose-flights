const Flight = require('../models/flight');

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
  // We can push (or unshift) subdocs into Mongoose arrays
  flight.destinations.push(req.body);
  try {
    // Save any changes made to the flight doc
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/flights/${flight._id}`);
}