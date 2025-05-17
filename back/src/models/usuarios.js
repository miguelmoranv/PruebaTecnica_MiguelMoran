const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol : {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
});

module.exports = mongoose.model('usuarios', usuariosSchema);