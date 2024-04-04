const mongoose = require('mongoose');

const alquilerSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  vestido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vestido',
  },
  fechaInicio: Date,
  fechaFin: Date,
  precioTotal: Number,
  estado: {
    type: String,
    enum: ['confirmado', 'alquilado', 'devuelto'],
    default: 'confirmado',
  },
});

const Alquiler = mongoose.model('Alquiler', alquilerSchema);

module.exports = Alquiler;
