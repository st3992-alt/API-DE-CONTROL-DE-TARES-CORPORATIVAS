const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../CONTROLLERS/task.controllers");

const authenticateUser = require(
    "../userAuthMiddleware"
);

const checkRole = require(
    "../roleMiddleware"
);

// Admin, Supervisor y Operador pueden consultar tareas.
// El controlador limita al Operador a sus tareas asignadas.
router.get(
    "/",
    authenticateUser,
    checkRole("Admin", "Supervisor", "Operador"),
    getTasks
);

// Admin y Supervisor pueden consultar cualquier tarea.
// El Operador solamente puede consultar una tarea asignada a él.
router.get(
    "/:id",
    authenticateUser,
    checkRole("Admin", "Supervisor", "Operador"),
    getTaskById
);

// Solamente Admin y Supervisor pueden crear tareas.
router.post(
    "/",
    authenticateUser,
    checkRole("Admin", "Supervisor"),
    createTask
);

// Solamente Admin y Supervisor pueden actualizar tareas.
router.put(
    "/:id",
    authenticateUser,
    checkRole("Admin", "Supervisor"),
    updateTask
);

// Solamente Admin puede eliminar tareas.
router.delete(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    deleteTask
);

module.exports = router;