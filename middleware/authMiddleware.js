const jwt = require('jsonwebtoken');
const StudentModel = require('../models/StudentModel');
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await StudentModel.findById(decoded.id);
        req.user = student;;
        req.token = token;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
}
module.exports = authMiddleware;