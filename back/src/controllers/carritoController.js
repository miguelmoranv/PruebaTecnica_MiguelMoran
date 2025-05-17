const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');

exports.verCarrito = async (req, res) => {
    try {
        const userId = req.params.userId;
        const carrito = await Carrito.findOne({ userId }).populate('productos.productoId');
        if (!carrito) return res.status(404).json({ message: 'Carrito vacío' });

        res.json(carrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

exports.agregarAlCarrito = async (req, res) => {
    try {
        const { userId, productoId, cantidad } = req.body;

        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        let carrito = await Carrito.findOne({ userId });

        if (!carrito) {
            carrito = new Carrito({ userId, productos: [] });
        }

        const index = carrito.productos.findIndex(p => p.productoId.equals(productoId));

        if (index >= 0) {
            carrito.productos[index].cantidad += cantidad;
        } else {
            carrito.productos.push({ productoId, cantidad });
        }

        await carrito.save();
        res.json({ message: 'Producto agregado al carrito', carrito });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar al carrito' });
    }
};

exports.eliminarDelCarrito = async (req, res) => {
    try {
        const { userId, productoId } = req.body;

        const carrito = await Carrito.findOne({ userId });
        if (!carrito) return res.status(404).json({ message: 'Carrito no encontrado' });

        carrito.productos = carrito.productos.filter(p => !p.productoId.equals(productoId));

        await carrito.save();
        res.json({ message: 'Producto eliminado del carrito', carrito });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar del carrito' });
    }
};
