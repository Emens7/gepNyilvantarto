const mongoose = require('mongoose');

const schema = mongoose.Schema({

    odometerValue: {
        type: Number,
        required: true
    },

    fuelAmount: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    refuelDate: {
        type: Date,
        required: true
    },

    notes: {
        type: String,
        default: null
    },

    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }

}, {
    timestamps: true
});

const refuelModel = mongoose.model('Refuel', schema);
module.exports = refuelModel;
