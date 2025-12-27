const jwt = require('jsonwebtoken');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const userPayload = jwt.verify(tokenCookieValue, process.env.JWT_SECRET);
            req.user = userPayload;
        } catch (error) { }

        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
}
