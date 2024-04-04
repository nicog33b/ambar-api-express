const express = require('express');
const mongoose = require('mongoose');

//BODY-P
const bodyParser = require('body-parser');

//DOTENV 
require('dotenv').config();

// **Configuración de MongoDB (archivo independiente)**
const mongoConfig = require('./mongo/connection');


// Importar el enrutador de vestidos
const vestidoRouter = require('./route/vestidoRoute');
const usuarioRouter = require('./route/usuarioRoute');
const alquilerRouter = require('./route/alquilerRoute');

// Conexión a MongoDB
mongoose.connect(mongoConfig.url)
  .then(() => console.log('Conexión a MongoDB establecida correctamente'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Inicializar Express
const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Usar las rutas definidas en el archivo .env
app.use(process.env.VESTIDO_ROUTE, vestidoRouter);
app.use(process.env.USUARIO_ROUTE, usuarioRouter);
app.use(process.env.ALQUILER_ROUTE, alquilerRouter);


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

