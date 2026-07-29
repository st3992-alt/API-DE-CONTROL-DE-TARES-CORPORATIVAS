const express = require("express");
const router = express.Router();

const {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
} = require("../CONTROLLERS/role.controllers");

const authenticateUser = require(
    "../userAuthMiddleware"
);

const checkRole = require(
    "../roleMiddleware"
);

router.post(
    "/",
    authenticateUser,
    checkRole("Admin"),
    createRole
);

router.get(
    "/",
    authenticateUser,
    checkRole("Admin"),
    getRoles
);

router.get(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    getRoleById
);

router.put(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    updateRole
);

router.delete(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    deleteRole
);

module.exports = router;