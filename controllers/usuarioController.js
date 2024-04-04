const Usuario = require('../model/usuarioModel');

const crearUsuario = async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.json(nuevoUsuario);
};

const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const obtenerUsuarioPorId = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

const actualizarUsuario = async (req, res) => {
  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // Opción para devolver el documento actualizado
  );
  res.json(usuarioActualizado);
};

const eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndRemove(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
