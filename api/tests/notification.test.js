require('./setup');

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);

describe('Test /notifications', () => {

    const vehicle = {
        "make": "Škoda",
        "model": "Scala",
        "manufactureYear": 2019,
        "licensePlate": "ABC-123",
        "vin": "SGZCZ43D13S812715"
    };

    const notificationData = {
        notificationDate: '2026-05-24T14:48:00.000Z',
        subject: 'Vezérműszíj 5 éves'
    };

    let token = null;
    let userId = null;
    let vehicleId = null;
    let notificationId = null;

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
        notificationData.vehicleId = vehicleId;
    });

    afterAll(async () => {
        //Drop db after testing
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('save notification data', async () => {

        const resp = await request
            .post('/notifications')
            .set('Authorization', token)
            .send(notificationData);

        expect(resp.status).toBe(201);
        expect(resp.body).toMatchObject(notificationData);
        expect(resp.body.userId).toBe(userId);

        notificationId = resp.body._id;
    });

    test('get notification by id', async () => {

        const resp = await request
            .get(`/notifications/${notificationId}`)
            .set(`Authorization`, token)
            .send();

        expect(resp.status).toBe(200);
        expect(resp.body).toMatchObject(notificationData);
    });

    test('get the list of notifications', async () => {
        const resp = await request
            .get(`/notifications`)
            .set(`Authorization`, token)
            .send();

        expect(resp.status).toBe(200)
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBe(1);
    });

    test('update notification data', async () => {

        const updatedNotificationData = {
            ...notificationData,
            subject: 'Légszűrő csere esedékes'
        }

        const resp = await request
            .put(`/notifications/${notificationId}`)
            .set(`Authorization`, token)
            .send(updatedNotificationData);

            expect(resp.status).toBe(200);
            expect(resp.body).toMatchObject(updatedNotificationData);
    });

    test('delete a notification data', async () => {
        const resp = await request
            .delete(`/notifications/${notificationId}`)
            .set(`Authorization`, token)
            .send();

        expect(resp.status).toBe(200);
    });

});