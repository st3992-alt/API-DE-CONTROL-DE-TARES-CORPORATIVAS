const jwt = require("jsonwebtoken");
const User = require("./models/user");

const authenticateUser = async (req, res, next) => {
    const authorization = req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Autenticación de usuario requerida"
        });
    }

    const token = authorization.substring(7);

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(payload.id)
            .populate("role");

        if (!user || user.isActive === false || !user.role) {
            return res.status(401).json({
                message: "Usuario no autorizado"
            });
        }

        req.user = {
            id: user._id.toString(),
            role: user.role.name
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token de usuario inválido o expirado"
        });
    }
};

module.exports = authenticateUser;