const controller = require('./service.controller');
const crudService = require('../../utils/crudservice');

jest.mock('../../utils/crudservice');

const service = crudService.createService();

const mockData = [
    
    {
        _id: 'ld7nhfmord2',
        summary: 'Légszűrő csere',
        serviceDate: '2021-07-24T14:48:00.000Z',
        odometerValue: 20017,
        expense: 17640,
        description:'Légszűrő használt',      
        vehicleId: 'qb6iqymo2y8',
        userId: 'abc123',
        createdAt: '2021-07-24T17:48:00.000Z',
        updatedAt: '2021-07-24T17:48:00.000Z'
    },

    {
        _id: 'sdf4ck8orvg',
        summary: 'Gyertya csere',
        serviceDate: '2021-10-24T14:48:00.000Z',
        odometerValue: 20017,
        expense: 17640,
        description:'Gyertya használt',      
        vehicleId: 'qb6iqymo2y8',
        userId: 'abc123',
        createdAt: '2021-06-24T17:48:00.000Z',
        updatedAt: '2021-06-24T17:48:00.000Z'
    }
    
];

const user = {
    _id: 'abc123'
};

describe('test service controller', () => {

    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    const getHandler = (middlewares) => middlewares[middlewares.length - 1];

    beforeEach(() => {
        crudService.setData(mockData);
    });

    test('can list services', async () => {
        const req = {
            params: {},
            query: {},
            user
        };

        await getHandler(controller.getAll)(req, res);

        expect(service.find).toBeCalled()
        expect(res.json).toBeCalledWith(mockData);
    });

    test('can get a service by id', async () => {
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

    test('can create service data', async () => {
        const data = {
            summary: 'Gyertya csere',
            odometerValue: 40017,
            description: 'Használt alkatrész',
            expense: 17640,
            serviceDate: '2021-06-24T14:48:00.000Z',
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

    test('can update service data', async () => {
        const data = {
            summary: 'Ékszíj csere',
            odometerValue: 40017,
            description: 'Új alkatrész',
            expense: 17630,
            serviceDate: '2021-07-24T14:48:00.000Z',
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

    test('can delete service data', async () => {
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