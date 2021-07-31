const userService = require('./user.service');
const controller = require('./user.controller');
const auth = require('../../utils/auth');

jest.mock('./user.service');
jest.mock('../../utils/auth');
auth.getJWT = jest.fn(() => { 
    return { token: 'token' };
});

const users = [
    {
        _id: 'qb6iqymo2y8',
        email: 'john@example.com',
        createdAt: '2021-07-29T14:39:59.028Z',
        updatedAt: '2021-07-29T14:39:59.028Z'
    },
    {
        _id: '3q40cvb9vl8',
        email: 'jane@example.org',
        createdAt: '2021-07-29T14:39:59.028Z',
        updatedAt: '2021-07-29T14:39:59.028Z'
    }
];

describe('Test user controller', () => {

    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    const getHandler = (middlewares) => middlewares[middlewares.length - 1];

    beforeEach(() => {
        userService.setData(users);
    });

    test('user can register', async () => {
        const data = {
            email: 'anne@example.org',
            password: 'passwd'
        };
        const req = {
            body: data
        };
        await getHandler(controller.register)(req, res);

        expect(userService.create).toBeCalledWith(data);
        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith(expect.objectContaining({
            _id: expect.any(String),
            email: data.email
        }));
    });

    test('user can login', async () => {
        const data = {
            email: 'john@example.com',
            password: 'passwd'
        }
        const req = {
            body: data
        }
        await getHandler(controller.login)(req, res);

        expect(userService.findByEmail).toBeCalledWith(data.email);
        expect(auth.getJWT).toBeCalled();
        expect(res.json).toBeCalledWith(expect.objectContaining({
            token: expect.any(String)
        }));

    });

    test('listing users', async () => {
        const req = {
            query: {}
        };
        await getHandler(controller.getAll)(req, res);

        expect(userService.find).toBeCalled();
        expect(res.json).toBeCalledWith(users);
    });

    test('getting a user by id', async () => {
        const req = {
            params: { id: '3q40cvb9vl8' }
        };
        await getHandler(controller.getById)(req, res);
        expect(userService.findById).toBeCalledWith(req.params.id);
        expect(res.json).toBeCalledWith(
            users.find(i => i._id === req.params.id)
        );

    });

});