require("dotenv").config();
const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET no está configurado en .env");
    process.exit(1);
}

const token = jwt.sign(
    {
        app: "API de Control de Tareas Corporativas",
        type: "application-token"
    },
    process.env.JWT_SECRET,
    {
        noTimestamp: true
    }
);

console.log("\nJWT generado:\n");
console.log(token);
console.log("\nCópialo en APP_TOKEN dentro del archivo .env");