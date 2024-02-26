const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinatinSchema = new Schema({
    airport: {
        type: String,
        enum: ['ATL', 'AUS','CLT', 'DFW', 'DEN','JFK','LAS', 'LAX','MCO','ORD', 'SAN', 'SEA']
    },
    arrival: {
        type: Date
    }
}, {
    timestamps: true
});

const flightSchema = new mongoose.Schema({

    airline: {
        type: String,
        enum: ['Alaska', 'Allegiant', 'American','Delta','Frontier','Hawaiian','JetBlue', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['ATL', 'AUS','CLT', 'DFW', 'DEN','JFK','LAS', 'LAX','MCO','ORD', 'SAN', 'SEA'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date
        // default: Date().now + 365*24*60*60*1000
        // default: () => new Date().setFullYear(new Date().getFullYear() + 1)
    },
    desinations: [destinatinSchema]

}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);