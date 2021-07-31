const mongoose = require('mongoose');

const schema = mongoose.Schema ({
    summary: {
        type: String,
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    odometerValue: {
        type: Number,
        required: true
    },
    expense: {
        type: Number,
        required: true
    },
    description: {
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

const serviceModel = mongoose.model('Service', schema);
module.exports = serviceModel;