const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('productos', productosSchema);