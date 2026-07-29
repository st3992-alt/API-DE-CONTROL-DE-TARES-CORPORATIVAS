const Role = require("../models/role");

// CREATE ROLE
const createRole = async (req, res) => {
    try {
        const role = await Role.create({
            name: req.body.name
        });

        return res.status(201).json({
            message: "Role created successfully",
            role
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// GET ALL ROLES
const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();

        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ROLE BY ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE ROLE
const updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        return res.status(200).json({
            message: "Role updated successfully",
            role
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// DELETE ROLE
const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json({
            message: "Role deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
};