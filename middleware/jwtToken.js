const jwtService = require("../services/jwtService");

function validate(method) {
    return (req, res, next) => {
        try {
            const token = req[method].token || '';
            const decoded = jwtService.verifyToken(token);
            if (!decoded) return res.status(401).json({message: 'Unauthorized'});
            req.decoded = decoded;
            next();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = { validateQuery: validate('query'), validateParams: validate('params') };