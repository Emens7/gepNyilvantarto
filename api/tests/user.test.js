require('./setup');

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

describe('Test /users', () => {

    let userId = null;
    let token = null;

    const userData = {
        email: 'user@example.com',
        password: 'abc127'
    };

    afterAll(async () => {
        //Drop db after testing
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('user can register', async () => {
        const resp = await request
            .post('/users/register')
            .send(userData);

        expect(resp.status).toBe(201);
        expect(resp.body).toMatchObject({
            email: 'user@example.com'
        });

        userId = resp.body._id;
    });

    test('user can login', async () => {
        
        //Login
        const resp = await request
            .post('/users/login')
            .send(userData);

        expect(resp.status).toBe(200);
        expect(resp.body).toHaveProperty('token');

        token = `Bearer ${resp.body.token}`;
        
    });

    test('get user by id', async () => {
        const resp = await request
            .get(`/users/${userId}`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject({
            email: userData.email
        });
    });

    test('get the list of users', async () => {
        const resp = await request
            .get(`/users`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBe(1);
    });

});
