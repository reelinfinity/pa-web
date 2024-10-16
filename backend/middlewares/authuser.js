
const express = require('express');
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied. Token is required.' });


    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format. Format should be "Bearer <token>"' });
    }

    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, '12345', (err, decoded) => {

        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired. Please log in again.' });
            }
            return res.status(403).json({ error: 'Invalid token' });
        }



        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;