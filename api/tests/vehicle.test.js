require('./setup');

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

describe('Test /vehicles', () => {

    const vehicle = {
        "make": "Škoda",
        "model": "Scala",
        "manufactureYear": 2019,
        "licensePlate": "ABC-123",
        "vin": "SGZCZ43D13S812715"
    };

    let token = null;
    let userId = null;
    let vehicleId = null;

    beforeAll(async () => {
        const userData = {
            email: 'user@example.org',
            password: 'abc127'
        };

        //Register user
        const registerResp = await request
            .post('/users/register')
            .send(userData);
        
        userId = registerResp.body._id;
        
        //Login
        const resp = await request
            .post('/users/login')
            .send(userData);
        
        token = `Bearer ${resp.body.token}`;
    });

    afterAll(async () => {
        //Drop db after testing
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('create vehicle', async () => {
        
        const resp = await request
            .post('/vehicles')
            .set('Authorization', token)
            .send(vehicle);

        expect(resp.status).toBe(201);
        expect(resp.body).toMatchObject(vehicle);
        expect(resp.body.userId).toBe(userId);

        vehicleId = resp.body._id;
    });

    test('get vehicle by id', async () => {
        
        const resp = await request
            .get(`/vehicles/${vehicleId}`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(vehicle);
    });

    test('get the list of vehicles', async () => {
        const resp = await request
            .get(`/vehicles`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBe(1);
    });

    test('update vehicle', async () => {
        
        const updatedVehicle = {
            ...vehicle,
            "licensePlate": "ABC-127"
        }

        const resp = await request
            .put(`/vehicles/${vehicleId}`)
            .set('Authorization', token)
            .send(updatedVehicle);

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(updatedVehicle);
    });

    test('delete a vehicle', async () => {
        const resp = await request
            .delete(`/vehicles/${vehicleId}`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
    });

});
