const mongoose = require('mongoose');
const Refuel = require('./refuel');
const Service = require('./service');
const Notification = require('./notification');

const schema = mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    manufactureYear: {
        type: Number,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true
    },
    vin: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
}, {
    timestamps: true
});

//Delete resources belonging to the deleted vehicle
schema.post('findOneAndDelete', function (doc) {
    if (doc) {
        Notification.deleteMany({ vehicleId: doc._id }).exec();
        Refuel.deleteMany({ vehicleId: doc._id }).exec();
        Service.deleteMany({ vehicleId: doc._id }).exec();
    }
});

const vehicleModel = mongoose.model('Vehicle', schema);

module.exports = vehicleModel;