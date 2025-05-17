// models/Carrito.js
const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    productos: [{
        productoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    creadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('carritos', carritoSchema);
