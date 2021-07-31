const mongoose = require('mongoose');

const schema = mongoose.Schema({
    notificationDate : {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
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

const notificationModel = mongoose.model('Notification', schema);
module.exports = notificationModel;
