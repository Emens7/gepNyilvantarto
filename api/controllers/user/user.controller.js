const { query, body, param } = require('express-validator');
const validator = require('./user.validator');
const userService = require('./user.service');
const auth = require('../../utils/auth');
const { validate, uniqueEmail } = require('../../utils/validation');

exports.register = [
    validator,
    body('email')
        .custom(uniqueEmail)
        .withMessage('Ezzel az e-mail címmel már regisztráltak!'),
    validate,
    async (req, res) => {
        const user = await userService.create(req.body);
        res.status(201).json(user);
    }
];

exports.login = [
    validator,
    validate,
    async (req, res) => {

        const user = await userService.findByEmail(req.body.email);

        if (user && await user.checkPassword(req.body.password)) {
            return res.json(auth.getJWT({
                _id: user._id,
                email: user.email
            }));
        }
    
        return res.status(401).json({
            error: 'Rossz felhasználónév vagy jelszó!'
        });    
    }
];

exports.getAll = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .toInt(),
    validate,
    async (req, res) => {
        const page = req.query.page ? req.query.page : 1;
        const items = await userService.find({}, page);
        res.json(items);
    }
];

exports.getById = [
    param('id').isMongoId(),
    validate,
    async (req, res, next) => {
        const item = await userService.findById(req.params.id);
        if (!item) {
            return next(new Error('NotFound'));
        }

        res.json(item);
        
    } 
];