require('./setup');

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

describe('Test /services', () => {
    
    const vehicle = {
        "make": "Škoda",
        "model": "Scala",
        "manufactureYear": 2019,
        "licensePlate": "ABC-123",
        "vin": "SGZCZ43D13S812715"
    };

    const serviceData = {
        summary: 'Vezérműszíj csere',
        serviceDate:  '2020-06-24T14:48:00.000Z',
        odometerValue: 144530,
        expense: 56098, 
        description: 'Vezérműszíj csere 5 évenként'
    };

    let token = null;
    let userId = null;
    let vehicleId = null;
    let serviceId = null;

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
        serviceData.vehicleId = vehicleId;
    });

    afterAll(async () => {
        //Drop db after testing
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('save service data', async () => {

        const resp = await request
            .post('/services')
            .set('Authorization', token)
            .send(serviceData);

        expect(resp.status).toBe(201);
        expect(resp.body).toMatchObject(serviceData);
        expect(resp.body.userId).toBe(userId);

        serviceId = resp.body._id;
    });

    test('get service by id', async () => {

        const resp = await request 
            .get(`/services/${serviceId}`)
            .set(`Authorization`, token)
            .send()

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(serviceData);
    });

    test('get the list of services', async () => {
        const resp = await request
            .get(`/services`)
            .set(`Authorization`, token)
            .send();

        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBe(1)
    });

    test('update service data', async () => {
        const updatedServiceData = {
            ...serviceData,
            summary: 'Vezérműszíj csere'
        }

        const resp = await request
            .put(`/services/${serviceId}`)
            .set(`Authorization`, token)
            .send(updatedServiceData);

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(updatedServiceData);
    });

    test('delete a service data', async () => {
        const resp = await request
            .delete(`/services/${serviceId}`)
            .set(`Authorization`, token)
            .send();

        expect(resp.status).toBe(200);
    });


});