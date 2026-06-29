const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('=================================');
        console.log('✅ Conectado a MongoDB');
        console.log('=================================');

    } catch (error) {
        console.error('❌ Error al conectar a MongoDB');
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;