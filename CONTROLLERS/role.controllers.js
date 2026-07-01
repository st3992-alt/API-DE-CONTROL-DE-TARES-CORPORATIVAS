const Role = require("../models/role");

// CREATE ROLE
const createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);

        res.status(201).json({
            message: "Role created successfully",
            role
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
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
            req.body,
            { new: true }
        );

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json({
            message: "Role updated successfully",
            role
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
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