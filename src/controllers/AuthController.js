const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User'); 
dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '1h' }
    );
};

const getToken = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getToken
};
