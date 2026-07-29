const User = require("../models/user");
const bcrypt = require("bcryptjs");

// CREATE USER
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "Nombre, correo, contraseña y rol son requeridos"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const user = await User.findById(createdUser._id)
            .populate("role");

        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// GET ALL USERS
const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("role");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("role");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "email",
            "role",
            "isActive"
        ];

        const changes = Object.fromEntries(
            Object.entries(req.body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        if (req.body.password) {
            changes.password = await bcrypt.hash(
                req.body.password,
                12
            );
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            changes,
            {
                new: true,
                runValidators: true
            }
        ).populate("role");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};