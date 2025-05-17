// models/Compra.js
const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
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
            required: true
        },
        precioUnitario: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('compras', compraSchema);
