const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const allAirports = ['ATL', 'AUS', 'CLT', 'DFW', 'DEN', 'JFK', 'LAS', 'LAX', 'MCO', 'ORD', 'SAN', 'SEA'];


module.exports = {
  index,
  show,
  new: newFlight,
  create
};

async function index(req, res) {
  try {
    const flights = await Flight.find({}).sort({ departs: 'asc' }); 
    res.render('flights/index', { flights });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flights from database');
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    
    // Sort the destinations array by 'arrival' date in ascending order
    if (flight && flight.destinations && flight.destinations.length > 0) {
      flight.destinations.sort((a, b) => new Date(a.arrival) - new Date(b.arrival));
    }

    // Fetch tickets associated with this flight
    const tickets = await Ticket.find({flight: flight._id});

    const usedAirports = flight.destinations.map(d => d.airport);
    if (flight.airport) {
      usedAirports.push(flight.airport); // Exclude the flight's own airport
    }
    const availableAirports = allAirports.filter(airport => !usedAirports.includes(airport));
    
    // Since Mongoose objects are immutable in certain contexts, we may need to convert it to a plain object
    // if direct modifications do not reflect in the rendered view.
    const flightObj = flight.toObject ? flight.toObject() : flight;
    
    res.render('flights/show', { flight: flightObj, availableAirports, tickets });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flight from database');
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