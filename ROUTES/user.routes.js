const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../CONTROLLERS/user.controllers");

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
    createUser
);

router.get(
    "/",
    authenticateUser,
    checkRole("Admin"),
    getUsers
);

router.get(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    getUserById
);

router.put(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    updateUser
);

router.delete(
    "/:id",
    authenticateUser,
    checkRole("Admin"),
    deleteUser
);

module.exports = router;