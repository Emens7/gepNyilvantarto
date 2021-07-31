const controller = require('./refuel.controller');
const crudService = require('../../utils/crudservice');

jest.mock('../../utils/crudservice');

const service = crudService.createService();

const mockData = [

    {
        _id: 'ld7nhfmord2',
        odometerValue: 40017,
        fuelAmount: 40,
        price: 17640,
        refuelDate: '2021-07-24T14:48:00.000Z',
        vehicleId: 'qb6iqymo2y8',
        userId: 'abc123',
        createdAt: '2021-07-24T17:48:00.000Z',
        updatedAt: '2021-07-24T17:48:00.000Z'
    },

    {
        _id: 'sdf4ck8orvg',
        odometerValue: 40120,
        fuelAmount: 35,
        price: 15550,
        refuelDate: '2021-07-27T15:32:00.000Z',
        vehicleId: 'qb6iqymo2y8',
        userId: 'abc123',
        createdAt: '2021-07-27T17:48:00.000Z',
        updatedAt: '2021-07-27T17:48:00.000Z'
    }
    
];

const user = {
    _id: 'abc123'
};

describe('test refuel controller', () => {

    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    const getHandler = (middlewares) => middlewares[middlewares.length - 1];

    beforeEach(() => {
        crudService.setData(mockData);
    });

    test('can list refuels', async () => {
        const req = {
            params: {},
            query: {},
            user
        };

        await getHandler(controller.getAll)(req, res);

        expect(service.find).toBeCalled()
        expect(res.json).toBeCalledWith(mockData);
    });

    test('can get a refuel by id', async () => {
        const req = {
            params: { id: 'sdf4ck8orvg' },
            user
        };

        await getHandler(controller.getById)(req, res);

        expect(service.findById).toBeCalledWith(req.params.id);
        expect(res.json).toBeCalledWith(
            mockData.find(i => i._id === req.params.id)
        );

    });

    test('can create refuel data', async () => {
        const data = {
            odometerValue: 40017,
            fuelAmount: 40,
            price: 17640,
            refuelDate: '2021-06-24T14:48:00.000Z',
            vehicleId: 'qb6iqymo2y8',
            userId: 'abc123'
        };

        const req = {
            body: data,
            user
        };

        await getHandler(controller.create)(req, res);

        expect(service.create).toBeCalledWith({
            ...data,
            userId: user._id
        });
        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith(expect.objectContaining(data));
    });

    test('can update refuel data', async () => {
        const data = {
            odometerValue: 40017,
            fuelAmount: 40,
            price: 17630,
            refuelDate: '2021-07-24T14:48:00.000Z',
            vehicleId: 'qb6iqymo2y8',
            userId: 'abc123'
        };

        const req = {
            body: data,
            params: { id: 'ld7nhfmord2' },
            user
        };

        await getHandler(controller.update)(req, res);

        expect(service.update).toBeCalledWith(
            { _id: req.params.id, userId: user._id },
            { ...data, userId: user._id }
        );
        expect(res.json).toBeCalledWith(expect.objectContaining(data));
    });

    test('can delete refuel data', async () => {
        const req = {
            params: { id: 'ld7nhfmord2' },
            user
        }

        await getHandler(controller.delete)(req, res);

        expect(service.delete).toBeCalledWith({
            _id: req.params.id,
            userId: user._id
        });

    });

});