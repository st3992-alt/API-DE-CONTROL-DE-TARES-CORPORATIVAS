require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Middleware para validar el JWT
const authMiddleware = require('./authMiddleware');

// Rutas
const userRoutes = require('./ROUTES/user.routes');
const taskRoutes = require('./ROUTES/task.routes');
const roleRoutes = require('./ROUTES/role.routes');
const authRoutes = require('./ROUTES/auth.routes');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares generales
app.use(helmet());
app.use(express.json());

// Todas las rutas colocadas después de este middleware requieren app-token
app.use(authMiddleware);

// Ruta principal pública
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'API de Control de Tareas Corporativas funcionando correctamente'
    });
});


// Rutas protegidas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);

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

// Escuchar en 0.0.0.0 para funcionar localmente y en Render
app.listen(PORT, '0.0.0.0', () => {
    console.log('=================================');
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    console.log('API de Control de Tareas Corporativas');
    console.log('=================================');
});

// Exportar la aplicación
module.exports = app;