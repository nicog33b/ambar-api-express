const mongoose = require('mongoose');

const vestidoSchema = new mongoose.Schema({
  nombre: String,
  tipo:String,
  descripcion: String,
  talles: [String],
  color: String,
  precio: Number,
  imagenes: [String], // Cambio: ahora imagenes es un array de cadenas
  disponible: Boolean,
});

const Vestido = mongoose.model('Vestido', vestidoSchema);

module.exports = Vestido;