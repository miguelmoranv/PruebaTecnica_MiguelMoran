const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/api/usuarios', usuariosRoutes);

const productosRoutes = require('./routes/productosRoutes');
app.use('/api/productos', productosRoutes);

const comprasRoutes = require('./routes/comprasRoutes');
app.use('/api/compras', comprasRoutes);

app.get("/", (req, res) => {
    res.send("Hola Mundo aa");
});


module.exports = app;