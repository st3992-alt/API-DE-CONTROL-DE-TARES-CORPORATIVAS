require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

const userRoutes = require('./ROUTES/user.routes');
const taskRoutes = require('./ROUTES/task.routes');
const roleRoutes = require('./ROUTES/role.routes');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/roles', roleRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Control de Tareas Corporativas');
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log('Hello World');
    console.log(`Server running on port ${PORT}`);
});