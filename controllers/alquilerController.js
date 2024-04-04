const Alquiler = require('../model/alquilerModel');
const Usuario = require('../model/usuarioModel');
const Vestido = require('../model/vestidoModel');

const crearAlquiler = async (req, res) => {
  const { usuarioId, vestidoId, fechaInicio, fechaFin } = req.body;

  // Validar existencia de usuario y vestido (opcional)
  const usuario = await Usuario.findById(usuarioId);
  const vestido = await Vestido.findById(vestidoId);

  if (!usuario || !vestido) {
    return res.status(400).json({ message: 'Usuario o vestido no encontrado' });
  }

  // Validar disponibilidad del vestido en el periodo (opcional)
  const alquileresExistentes = await Alquiler.find({
    vestido: vestidoId,
    $or: [
      { fechaInicio: { $lte: fechaFin }, fechaFin: { $gte: fechaInicio } },
      { fechaInicio: { $gte: fechaInicio }, fechaFin: { $lte: fechaFin } },
    ],
  });

  if (alquileresExistentes.length > 0) {
    return res.status(400).json({ message: 'Vestido no disponible en el periodo' });
  }

  // Calcular precio total (opcional, basado en precio diario del vestido)
  const precioDiario = vestido.precio; // Reemplazar con lógica de cálculo
  const diasAlquiler = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
  const precioTotal = precioDiario * diasAlquiler;

  const nuevoAlquiler = new Alquiler({
    usuario: usuarioId,
    vestido: vestidoId,
    fechaInicio,
    fechaFin,
    precioTotal,
  });

  await nuevoAlquiler.save();
  res.json(nuevoAlquiler);
};

const obtenerAlquileres = async (req, res) => {
  const alquileres = await Alquiler.find().populate('usuario').populate('vestido');
  res.json(alquileres);
};

const obtenerAlquilerPorId = async (req, res) => {
  const alquiler = await Alquiler.findById(req.params.id)
    .populate('usuario')
    .populate('vestido');
  res.json(alquiler);
};

const actualizarAlquiler = async (req, res) => {
  const { usuarioId, vestidoId, fechaInicio, fechaFin, estado } = req.body;

  // Validar existencia del alquiler (opcional)
  const alquiler = await Alquiler.findById(req.params.id);
  if (!alquiler) {
    return res.status(400).json({ message: 'Alquiler no encontrado' });
  }

  // Validar disponibilidad del vestido en el nuevo periodo (opcional, si se modifica)
  if (fechaInicio !== alquiler.fechaInicio || fechaFin !== alquiler.fechaFin) {
    const alquileresExistentes = await Alquiler.find({
      vestido: vestidoId,
      $or: [
        { fechaInicio: { $lte: fechaFin }, fechaFin: { $gte: fechaInicio } },
        { fechaInicio: { $gte: fechaInicio }, fechaFin: { $lte: fechaFin } },
      ],
    });

    if (alquileresExistentes.length > 0) {
      return res.status(400).json({ message: 'Vestido no disponible en el periodo' });
    }
  }

  const alquilerActualizado = await Alquiler.findByIdAndUpdate(
    req.params.id,
    { usuarioId, vestidoId, fechaInicio, fechaFin, estado },
    { new: true } // Opción para devolver el documento actualizado
  );

  res.json(alquilerActualizado);
};

const eliminarAlquiler = async (req, res) => {
  await Alquiler.findByIdAndRemove(req.params.id);
  res.json({ message: 'Alquiler eliminado' });
};

module.exports = {
  crearAlquiler,
  obtenerAlquileres,
  obtenerAlquilerPorId,
  actualizarAlquiler,
  eliminarAlquiler,
};
