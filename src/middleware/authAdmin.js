const User = require('../models/User');
const authAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied' });
};

module.exports = {
    authAdmin
};
