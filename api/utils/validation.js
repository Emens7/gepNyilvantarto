const { validationResult } = require('express-validator');
const User = require('../models/user');
const Vehicle = require('../models/vehicle');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

//Check if user with email address is already in the database
const uniqueEmail = async (email) => {
    const exists = await User.exists({ email });
    if (exists) {
        return Promise.reject();
    }
};

//Check if the user owns the vehicle referenced by vehicleId
const validVehicleId = async (vehicleId, { req }) => {

    const item = await Vehicle
        .findOne({ _id: vehicleId })
        .select({ 'userId': 1 })
        .exec();
        
    if (!item || req.user._id !== item.userId.toString()) {
        return Promise.reject();
    }
};


module.exports = { 
    validate,
    uniqueEmail,
    validVehicleId
};