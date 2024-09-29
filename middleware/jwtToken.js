const jwtService = require("../services/jwtService");

function validate(method) {
    return (req, res, next) => {
        try {
            let token = '';
            if (method === 'query') token = req.query.token;
            if (method === 'params') token = req.params.token;
            if (method === 'headers' && req.headers.authorization) token = req.headers.authorization.split(' ')[1];
            if (method === 'cookies' && req.cookies.refreshToken) token = req.cookies.refreshToken;
            const decoded = jwtService.verifyToken(token);
            if (!decoded) return res.status(401).json({message: 'Unauthorized'});
            req.decoded = decoded;
            next();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = {
    validateQuery: validate('query'),
    validateParams: validate('params'),
    validateToken: validate('headers'),
    validateRefreshToken: validate('cookies')
};