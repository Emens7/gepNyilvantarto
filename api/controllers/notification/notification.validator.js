const { body } = require('express-validator');
const { validVehicleId } = require('../../utils/validation');

module.exports = [
    body('notificationDate')
        .isISO8601().widthMessage('Az értesítés időpontját be kell jelölni'),

    body('subject')
        .notEmpty().withMessage('Az értesítés megadása kötelező!')
        .isLength({ max: 1500 }).widthMessage('Az értesítés szövege nem lehet hosszabb 1500 karakternél'),

    body('vehicleId')
        .isMongoId()
        .bail() //Stop validation if the ObjectId is invalid
        .custom(validVehicleId)
]