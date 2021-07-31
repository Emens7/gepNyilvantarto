const { body } = require('express-validator');
const { validVehicleId } = require('../../utils/validation');

module.exports = [
    body('summary')
        .notEmpty().withMessage('Az elnevezés megadása kötelező!')
        .isLength({ max: 150 }).withMessage('Az elnevezés nem lehet hosszabb 150 karakternél'),

    body('serviceDate')
        .isISO8601().withMessage('A szervízelés időpontját kötelező megadni'),

    body('odometerValue')
        .isFloat({ min: 0 }).withMessage('A kilométer óra állást kötelező megadni'),

    body('expense')
        .isInt({ min: 0 }).withMessage('A szervíz költséget kötelező megadni'),

    body('description')
        .optional({ nullable: true })
        .isLength({ max: 2500 }).withMessage('A szervíz munkák leírása nem lehet hosszabb 2500 karakternél'),

    body('vehicleId')
        .isMongoId()
        .bail() //Stop validation if the ObjectId is invalid
        .custom(validVehicleId)

]