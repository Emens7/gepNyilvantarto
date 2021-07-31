const { query, param } = require('express-validator');
const validator = require('./vehicle.validator');
const { validate } = require('../../utils/validation');
const { createService } = require('../../utils/crudservice');
const Vehicle = require('../../models/vehicle');
const service = createService(Vehicle);

exports.getAll = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .toInt(),
    validate,
    async (req, res) => {
        const page = req.query.page ? req.query.page : 1;
        const items = await service.find({ userId: req.user._id }, page);
        res.json(items);
    }
];

exports.getById = [
    param('id').isMongoId(),
    validate,
    async (req, res, next) => {

        const item = await service.findById(req.params.id);

        if (!item || req.user._id !== item.userId.toString()) {
            return next(new Error('NotFound'));
        }

        res.json(item);
        
    }
];

exports.create = [
    validator,
    validate,
    async (req, res) => {
        const item = await service.create({ ...req.body, userId: req.user._id });
        res.status(201).json(item);
    }
];

exports.update = [
    param('id').isMongoId(),
    validator,
    validate,
    async (req, res, next) => {

        const item = await service.update(
            { _id: req.params.id, userId: req.user._id },
            { ...req.body, userId: req.user._id }
        );

        if (!item) {
            return next(new Error('NotFound'));
        }

        res.json(item);
    }
];

exports.delete = [
    param('id').isMongoId(),
    validate,
    async (req, res, next) => {

        const item = await service.delete(
            { _id: req.params.id, userId: req.user._id }
        );

        if (!item) {
            return next(new Error('NotFound'));
        }

        res.json({});
    }
];