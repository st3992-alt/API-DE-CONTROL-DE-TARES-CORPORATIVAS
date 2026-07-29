const mongoose = require("mongoose");
const Task = require("../models/task");

const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

// CREATE TASK
const createTask = async (req, res) => {
    const {
        title,
        description,
        status,
        assignedTo
    } = req.body;

    if (
        !title ||
        !description ||
        !assignedTo ||
        !isValidId(assignedTo)
    ) {
        return res.status(400).json({
            message: "Datos de tarea inválidos"
        });
    }

    try {
        const task = await Task.create({
            title,
            description,
            status,
            assignedTo,

            // Se obtiene del JWT, no del body
            createdBy: req.user.id
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// GET ALL TASKS
const getTasks = async (req, res) => {
    try {
        const filter =
            req.user.role === "Operador"
                ? { assignedTo: req.user.id }
                : {};

        const tasks = await Task.find(filter)
            .populate("assignedTo")
            .populate("createdBy");

        return res.status(200).json(tasks);

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// GET TASK BY ID
const getTaskById = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    try {
        const filter = {
            _id: req.params.id
        };

        if (req.user.role === "Operador") {
            filter.assignedTo = req.user.id;
        }

        const task = await Task.findOne(filter)
            .populate("assignedTo")
            .populate("createdBy");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json(task);

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// UPDATE TASK
const updateTask = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const allowedFields = [
        "title",
        "description",
        "status",
        "assignedTo"
    ];

    const changes = Object.fromEntries(
        Object.entries(req.body).filter(([key]) =>
            allowedFields.includes(key)
        )
    );

    if (
        changes.assignedTo &&
        !isValidId(changes.assignedTo)
    ) {
        return res.status(400).json({
            message: "Datos de tarea inválidos"
        });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            changes,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// DELETE TASK
const deleteTask = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    try {
        const task = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};