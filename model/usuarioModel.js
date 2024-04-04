const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  rol: {
    type: String,
    enum: ['cliente', 'administrador'],
    default: 'cliente',
  },
});

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;
