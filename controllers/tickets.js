const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    // addToFlight
};

async function newTicket(req, res) {
    const tickets = await Ticket.find({}).sort('name');
    const flight = await Flight.findById(req.params.id);
    res.render('tickets/new', { title: 'Add Ticket', tickets, flight });
  }

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
  try {
    const newTicket = await Ticket.create(req.body);
    newTicket.flight = flight;
    await newTicket.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.log(err);
  }
}

// async function addToFlight(req, res) {
//     try {
//       const ticket = await Ticket.findById(req.body.ticketId);
//       if (!ticket) {
//         console.error('Ticket not found');
//         return res.status(404).send('Ticket not found');
//       }
//       ticket.flight = req.params.id;
//       await ticket.save();
//       res.redirect(`/flights/${req.params.id}`);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send(err.message);
//     }
//   }