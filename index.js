require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');

// Middleware JWT
const authMiddleware = require('./authMiddleware');

// Rutas
const userRoutes = require('./ROUTES/user.routes');
const taskRoutes = require('./ROUTES/task.routes');
const roleRoutes = require('./ROUTES/role.routes');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares generales
app.use(helmet());
app.use(express.json());

// Ruta principal pública
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'API de Control de Tareas Corporativas funcionando correctamente'
    });
});

// Ruta pública para generar siempre el mismo JWT
app.post('/token', (req, res) => {
    try {
        // Verificar que exista la clave secreta
        if (!process.env.APP_TOKEN) {
            return res.status(500).json({
                message: 'APP_TOKEN no está configurado en el servidor'
            });
        }

        // El payload debe permanecer igual
        const payload = {
            app: 'API de Control de Tareas Corporativas'
        };

        // Generar JWT fijo
        const token = jwt.sign(
            payload,
            process.env.APP_TOKEN,
            {
                algorithm: 'HS256',
                noTimestamp: true
            }
        );

        return res.status(200).json({
            token
        });

    } catch (error) {
        console.error('Error al generar el JWT:', error.message);

        return res.status(500).json({
            message: 'Error al generar el token',
            error: error.message
        });
    }
});

// Rutas protegidas con JWT
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/roles', authMiddleware, roleRoutes);

// Middleware para rutas inexistentes
app.use((req, res) => {
    return res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

// Middleware general para errores
app.use((error, req, res, next) => {
    console.error('Error del servidor:', error.message);

    return res.status(500).json({
        message: 'Error interno del servidor'
    });
});

// Render proporciona automáticamente process.env.PORT
const PORT = process.env.PORT || 5100;

// Escuchar en 0.0.0.0 para funcionar en Render
app.listen(PORT, '0.0.0.0', () => {
    console.log('=================================');
    console.log(`Server running on port ${PORT}`);
    console.log('=================================');
});

// Exportar la aplicación
module.exports = app;