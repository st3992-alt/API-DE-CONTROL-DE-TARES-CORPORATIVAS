const checkRole = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Autenticación de usuario requerida"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Permisos insuficientes"
            });
        }

        next();
    };
};

module.exports = checkRole;