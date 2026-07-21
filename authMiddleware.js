const jwt = require("jsonwebtoken");

const verificarAppToken = (req, res, next) => {
    const token = req.header("app-token");

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado. El header app-token es requerido."
        });
    }

    if (token !== process.env.APP_TOKEN) {
        return res.status(401).json({
            mensaje: "Acceso denegado. App-token incorrecto."
        });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.aplicacion = verificado;
        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Acceso denegado. JWT inválido."
        });
    }
};

module.exports = verificarAppToken;