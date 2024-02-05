const keyAuthorize = (allowedRoles) => {
    return (req, res, next) => {
        if (
            !Array.isArray(allowedRoles) ||
            Array.isArray(allowedRoles) && !allowedRoles.includes(req.clientRole)
        ) {
        return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

module.exports = keyAuthorize;