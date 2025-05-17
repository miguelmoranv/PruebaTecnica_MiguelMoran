const app = require('./app');
const mongoose  = require('mongoose');
require('dotenv').config()

const port = process.env.PORT 

const URI = process.env.URI_MONGO

mongoose.set("strictQuery", false);

mongoose
    .connect(URI)
    .then(console.log('Conectado a Mongo Atlas'))
    .catch(err => console.log(err))

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});