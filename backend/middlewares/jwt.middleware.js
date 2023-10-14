const jwt = require("jsonwebtoken");

function isPublicRoute(req) {
    // List the routes that should be considered public
    const publicRoutes = ["/normaluser/login", "/normaluser/createuser"];
    return publicRoutes.includes(req.originalUrl);
}

const jwtAuthentication = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        if (!isPublicRoute(req)) {
            const token = req.headers.authorization.split(' ')[1];
            const data = jwt.verify(token, jwtSecretKey);
            const { user_id, email } = data;

            if (user_id !== undefined) {
                req._id = user_id;
                req.email = email;
            }
        }
        next();
    } catch (error) {
        next({
            name: "UnauthorizedError",
        });
    }
}

module.exports = jwtAuthentication;
