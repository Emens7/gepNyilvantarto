const express = require('express');
require('express-async-errors');
const logger = require('./utils/logger');
const morgan = require('morgan');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const jwt = require('express-jwt');
const cors = require('cors');

const app = express();

//Parse JSON request bodies
app.use(express.json());

//Logging
app.use(morgan('combined', {
    stream: logger.stream
}));

//Database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    logger.info('Connected to the database')
}).catch((err) => {
    logger.error(err);
    process.exit(1);
});

//Access-Control-Allow-Origin: *
app.use(cors());

//JWT auth
const nonProtected = [
    '/',
    '/users/login',
    '/users/register',
    '/openapi.json',
    /^\/api-docs/
];

app.use(
    jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256']}
).unless({ path: nonProtected }));


//Openapi browser
const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Index
app.get('/', (req, res) => {
    res.json({ 
      title: 'Vehicles API',
      documentation: '/api-docs'
    });
});

//API routes
app.use('/users', require('./controllers/user/user.router'));
app.use('/vehicles', require('./controllers/vehicle/vehicle.router'));
app.use('/refuels', require('./controllers/refuel/refuel.router'));
app.use('/services', require('./controllers/service/service.router'));
app.use('/notifications', require('./controllers/notification/notification.router'));

//Error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
          error: 'Your token is invalid!'
      });
    } else if (err.message === 'Forbidden') {
        res.status(403).json({
            error: 'You don\'t have permission to perform this operation!'
        });
    } else if (err.message === 'NotFound') {
        res.status(404).json({
            error: 'Not found!'
        });
    } else {
        //Log the stack trace
        logger.error(err.stack);
        res.status(500).json({
            error: 'Internal server error!'
        });
    }
});

module.exports = app;