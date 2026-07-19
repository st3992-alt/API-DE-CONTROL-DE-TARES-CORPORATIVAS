const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener Authorization de los headers
    const authorization = req.headers.authorization;

    // Comprobar que se envió el encabezado
    if (!authorization) {
        return res.status(401).json({
            message: 'Token requerido'
        });
    }

    // Comprobar el formato Bearer
    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Formato de token incorrecto'
        });
    }

    // Extraer solamente el JWT
    const token = authorization.substring(7).trim();

    if (!token) {
        return res.status(401).json({
            message: 'Token requerido'
        });
    }

    try {
        // Verificar el JWT usando la clave secreta
        const decoded = jwt.verify(
            token,
            process.env.APP_TOKEN,
            {
                algorithms: ['HS256']
            }
        );

        // Guardar la información decodificada
        req.tokenData = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido',
            error: error.message
        });
    }
};

module.exports = authMiddleware;