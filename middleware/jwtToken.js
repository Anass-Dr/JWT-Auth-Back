const jwtService = require("../services/jwtService");

function validateQuery(req, res, next) {
    const token = req.query.token || '';
    const decoded = jwtService.verifyToken(token);
    if (!decoded) return res.status(401).json({message: 'Unauthorized'});
    req.decoded = decoded;
    next();
}

function validateHeader(req, res, next) {
    next();
}

module.exports = { validateQuery, validateHeader };