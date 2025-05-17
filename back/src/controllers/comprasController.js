const Compra = require('../models/compras');
const Producto = require('../models/productos');

exports.realizarCompra = async (req, res) => {
    try {
        const { userId, carrito } = req.body;

        if (!carrito || carrito.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío.' });
        }

        let total = 0;
        const productosParaCompra = [];

        for (const item of carrito) {
            const producto = await Producto.findById(item.productoId);
            if (!producto) {
                return res.status(400).json({ message: `Producto no encontrado: ${item.productoId}` });
            }

            const cantidad = item.cantidad;

            if (producto.stock < cantidad) {
                return res.status(400).json({
                    message: `No hay suficiente stock para el producto: ${producto.nombreProducto}`
                });
            }

            // Armar la compra
            productosParaCompra.push({
                productoId: producto._id,
                cantidad,
                precioUnitario: producto.precio
            });

            total += producto.precio * cantidad;

            // Descontar stock
            producto.stock -= cantidad;
            await producto.save();
        }

        // Registrar compra
        const compra = new Compra({
            userId,
            productos: productosParaCompra,
            total
        });

        await compra.save();

        res.status(200).json({ message: 'Compra realizada con éxito.', compra });

    } catch (error) {
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

exports.getComprasUsuario = async (req, res) => {
  const { userId } = req.params;

  try {
    const compras = await Compra.find({ userId })
      .sort({ fecha: -1 })
      .populate('productos.productoId', 'nombreProducto precio'); // trae nombre y precio del producto

    res.json(compras);
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ message: 'Error al obtener las compras' });
  }
};


