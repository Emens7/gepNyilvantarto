const path = require('path');
require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.test')
});

//Turn of the logger
const logger = require('../utils/logger');
logger.transports.forEach((t) => (t.silent = true));