const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create
};

// async function index(req, res) {
//   const flights = await Flight.find({});
//   res.render('flights/index', { flights });
// }

async function index(req, res) {
  try {
    const flights = await Flight.find({}).sort({ departs: 'asc' }); // Sorting flights by departure date in descending order
    res.render('flights/index', { flights });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flights from database');
  }
}

function newFlight(req, res) {
  // We'll want to be able to render an errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
    try {
      await Flight.create(req.body);
      res.redirect('/flights');
    } catch (err) {
      console.log(err);
      res.render('flights/new', { errorMsg: err.message });
    }
  }