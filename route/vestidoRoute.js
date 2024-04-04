
const express = require('express');
const router = express.Router();

const {
  crearVestido,
  obtenerVestidos,
  obtenerVestidoPorId,
  actualizarVestido,
  eliminarVestido,
} = require('../controllers/vestidoController');


// Rutas para vestidos

router.post('/vestidos', crearVestido);
router.get('/vestidos', obtenerVestidos);
router.get('/vestidos/:id', obtenerVestidoPorId);
router.put('/vestidos/:id', actualizarVestido);
router.delete('/vestidos/:id', eliminarVestido);


module.exports= router