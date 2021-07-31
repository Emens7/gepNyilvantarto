const { body } = require('express-validator');
const { validVehicleId } = require('../../utils/validation');

module.exports = [
    body('odometerValue')
        .isFloat({ min: 0 }).withMessage('A kilométeróra állását kötelező számként megadni!'),

    body('fuelAmount')
        .isFloat({ min: 0 }).withMessage('A tankolt üzemanyag mennyiségét kötelező számként megadni!'),

    body('price')
        .isInt({ min: 0 }).withMessage('Az árat kötelező számként megadni!'),

    body('refuelDate')
        .isISO8601().withMessage('A tankolás időpontját kötelező megadni!'),

    body('notes')
        .optional({ nullable: true })
        .isLength({ max: 350 }).withMessage('A megjegyzés nem lehet hosszabb 350 karakternél!'),

    body('vehicleId')
        .isMongoId()
        .bail() //Stop validation if the ObjectId is invalid
        .custom(validVehicleId)
];