const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email y contraseña son requeridos"
        });
    }

    try {
        const user = await User.findOne({ email })
            .select("+password")
            .populate("role");

        if (!user || user.isActive === false || !user.role) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            {
                id: user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        return res.status(200).json({
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

module.exports = {
    login
};