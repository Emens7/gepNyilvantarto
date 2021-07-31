const controller = require('./vehicle.controller');
const crudService = require('../../utils/crudservice');

jest.mock('../../utils/crudservice');

const mockData = [
    {
        _id: "qb6iqymo2y8",
        make: "Škoda",
        model: "Scala",
        manufactureYear: 2019,
        licensePlate: "ABC-123",
        vin: "SGZCZ43D13S812715",
        userId: "abc123",
        createdAt: "2021-07-29T14:39:59.028Z",
        updatedAt: "2021-07-29T14:39:59.028Z"
    },

    {
        _id: "ld7nhfmord2",
        make: "Ford",
        model: "Mondeo",
        manufactureYear: 2017,
        licensePlate: "ABC-144",
        vin: "HGDCZ43D14S812715",
        userId: "abc123",
        createdAt: "2021-07-29T15:39:59.028Z",
        updatedAt: "2021-07-29T15:39:59.028Z"
    }
];


const service = crudService.createService();

const user = {
    _id: 'abc123'
}

describe('Test vehicle controller', () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    const getHandler = (middlewares) => middlewares[middlewares.length - 1];

    beforeEach(() => {
        crudService.setData(mockData);
    });

    test('can list the vehicles', async () => {
        const req = {
            params: {},
            query: {},
            user
        };

        await getHandler(controller.getAll)(req, res);

        expect(service.find).toBeCalled()
        expect(res.json).toBeCalledWith(mockData);
    });

    test('can get vehicle by id', async () => {
        const req = {
            params: { id: 'qb6iqymo2y8' },
            user
        };

        await getHandler(controller.getById)(req, res);

        expect(service.findById).toBeCalledWith(req.params.id);
        expect(res.json).toBeCalledWith(
            mockData.find(i => i._id === req.params.id)
        );

    });

    test('can create vehicle', async () => {
        const data = {
            make: "Suzuki",
            model: "SX4",
            manufactureYear: 2016,
            licensePlate: "AHF-152",
            vin: "FKCCZ43D14S812724",
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

    test('can update vehicle', async () => {
        const data = {
            make: "Ford",
            model: "Mondeo",
            manufactureYear: 2017,
            licensePlate: "ABC-147",
            vin: "HGDCZ43D14S812715",
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


    test('can delete a vehicle', async () => {
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