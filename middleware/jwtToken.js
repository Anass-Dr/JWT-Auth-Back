const jwtService = require("../services/jwtService");

function validate(method) {
    return (req, res, next) => {
        try {
            let token = '';
            if (method === 'query') token = req.query.token;
            if (method === 'params') token = req.params.token;
            if (method === 'cookies' && req.cookies.refreshToken) token = req.cookies.refreshToken;
            req.decoded = jwtService.verifyToken(token);
            next();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

function authorize(roles = []) {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwtService.verifyToken(token);
            if (roles.length) {
                if (decoded.roles.some(role => roles.includes(role))) {
                    return res.status(403).json({error: 'Unauthorized'});
                }
            }
            req.decoded = decoded;
            next();
        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    }
}

module.exports = {
    validateQuery: validate('query'),
    validateParams: validate('params'),
    validateRefreshToken: validate('cookies'),
    authorize,
};