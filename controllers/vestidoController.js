const Vestido = require('../model/vestidoModel');

const crearVestido = async (req, res) => {
  try {
    const nuevoVestido = await Vestido.create(req.body);
    res.status(201).json(nuevoVestido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const obtenerVestidos = async (req, res) => {
  try {
    const vestidos = await Vestido.find();
    res.json(vestidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerVestidoPorId = async (req, res) => {
  try {
    const vestido = await Vestido.findById(req.params.id);
    if (!vestido) {
      return res.status(404).json({ message: 'Vestido no encontrado' });
    }
    res.json(vestido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarVestido = async (req, res) => {
  try {
    const vestidoActualizado = await Vestido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Opción para devolver el documento actualizado
    );
    if (!vestidoActualizado) {
      return res.status(404).json({ message: 'Vestido no encontrado' });
    }
    res.json(vestidoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarVestido = async (req, res) => {
  try {
    const vestidoEliminado = await Vestido.findByIdAndDelete(req.params.id);
    if (!vestidoEliminado) {
      return res.status(404).json({ message: 'Vestido no encontrado' });
    }
    res.json({ message: 'Vestido eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearVestido,
  obtenerVestidos,
  obtenerVestidoPorId,
  actualizarVestido,
  eliminarVestido,
};
