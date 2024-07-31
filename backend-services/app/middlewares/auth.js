const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
    try {
        let token;
        // check header
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            throw new UnauthenticatedError("Token not define");
        }

        const payload = isTokenValid({ token });

        // set user
        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            id: payload.userId,
        };

        next();
    } catch (err) {
        next(err);
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("You don't have access");
        }

        next();
    };
};

module.exports = { authenticateUser, authorizeRoles };
