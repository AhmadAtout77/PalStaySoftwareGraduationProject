// authMiddleware.js
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const secretKey = 'a3d2311a8dfce2f91165030076b61e2cfaeec5c64a7f28a34c731e60abd88172'; 

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ user }, secretKey, { expiresIn: '8h' });
};

// Verify JWT Token Middleware
const verifyToken = expressJwt({ secret: secretKey, algorithms: ['HS256'] });

module.exports = { generateToken, verifyToken };
