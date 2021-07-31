const jwtToken = require('jsonwebtoken');

const getJWT = (payload) => {
    return {
        token: jwtToken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        })
    };
} 

module.exports = { getJWT };