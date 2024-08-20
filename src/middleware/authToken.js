const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decodedToken;
        next();
    });
};

module.exports = {
    authToken
};
