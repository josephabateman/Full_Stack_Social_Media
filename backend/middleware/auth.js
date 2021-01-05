const jwt = require('jsonwebtoken')

module.exports = async function authenticateToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken) {
            res.locals.testing = decodedToken.userId
            res.locals.firstName = decodedToken.firstName
            res.locals.lastName = decodedToken.lastName
            next()
        } else {
            throw 'Invalid user ID';
        }
    } catch(error) {
        console.log(error)
        res.status(401).json({
            error: 'Are you trying to hack the system? We are very secure!'
        });
    }
}