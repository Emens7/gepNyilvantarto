require('./setup');

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

describe('Test /refuels', () => {

    const vehicle = {
        "make": "Škoda",
        "model": "Scala",
        "manufactureYear": 2019,
        "licensePlate": "ABC-123",
        "vin": "SGZCZ43D13S812715"
    };

    const refuelData = {
        odometerValue: 40017,
        fuelAmount: 40,
        price: 17640,
        refuelDate: '2021-07-24T14:48:00.000Z'
    };

    let token = null;
    let userId = null;
    let vehicleId = null;
    let refuelId = null;

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
        const loginResp = await request
            .post('/users/login')
            .send(userData);
        
        token = `Bearer ${loginResp.body.token}`;

        //Create a vehicle
        const vehicleResp = await request
            .post('/vehicles')
            .set('Authorization', token)
            .send(vehicle);

        vehicleId = vehicleResp.body._id;
        refuelData.vehicleId = vehicleId;
    });

    afterAll(async () => {
        //Drop db after testing
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('save refuel data', async () => {
        
        const resp = await request
            .post('/refuels')
            .set('Authorization', token)
            .send(refuelData);

        expect(resp.status).toBe(201);
        expect(resp.body).toMatchObject(refuelData);
        expect(resp.body.userId).toBe(userId);

        refuelId = resp.body._id;
    });

    test('get refuel by id', async () => {
        
        const resp = await request
            .get(`/refuels/${refuelId}`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(refuelData);
    });

    test('get the list of refuels', async () => {
        const resp = await request
            .get(`/refuels`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBe(1);
    });

    test('update refuel data', async () => {
        
        const updatedRefuelData = {
            ...refuelData,
            notes: 'OMV Siófok'
        }

        const resp = await request
            .put(`/refuels/${refuelId}`)
            .set('Authorization', token)
            .send(updatedRefuelData);

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(updatedRefuelData);
    });

    test('delete a refuel data', async () => {
        const resp = await request
            .delete(`/refuels/${refuelId}`)
            .set('Authorization', token)
            .send();

        expect(resp.status).toBe(200);
    });

});