const { body } = require('express-validator');

module.exports = [
    body('email')
        .isEmail().withMessage('Érvénytelen e-mail cím!'),
    body('password')
        .isLength({ min: 6, max: 12 }).withMessage('A jelszó hosszának 6 és 12 karakter között kell lennie!')
];