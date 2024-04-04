const express = require('express');
const router = express.Router();

const {
  crearAlquiler,
  obtenerAlquileres,
  obtenerAlquilerPorId,
  actualizarAlquiler,
  eliminarAlquiler,
} = require('../controllers/alquilerController');

router.post('/alquileres', crearAlquiler);
router.get('/alquileres', obtenerAlquileres);
router.get('/alquileres/:id', obtenerAlquilerPorId);
router.put('/alquileres/:id', actualizarAlquiler);
router.delete('/alquileres/:id', eliminarAlquiler);

module.exports = router;
