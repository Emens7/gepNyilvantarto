const { body } = require('express-validator');

module.exports = [
    body('make')
        .notEmpty().withMessage('A gyártó megadása kötelező!')
        .isLength({ max: 50 }).withMessage('A gyártó neve nem lehet 50 karakternél hosszabb!'),

    body('model')
        .notEmpty().withMessage('A model megadása kötelező!')
        .isLength({ max: 50 }).withMessage('A model nem lehet 50 karakternél hosszabb!'),

    body('manufactureYear')
        .isInt().withMessage('A gyártás évét egész számként meg kell adni!'),

    body('licensePlate')
        .notEmpty().withMessage('A rendszám/azonosító megadása kötelező!')
        .isLength({ max: 50 }).withMessage('A rendszám/azonosító nem lehet 50 karakternél hosszabb!'),

    body('vin')
        .optional({ nullable: true })
        .isLength({ max: 25 }).withMessage('Az alvázszám nem lehet 25 karakternél hosszabb!'),
];