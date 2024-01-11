const { Router } = require('express');
const cors = require('cors');
const router = Router();
const express = require('express');
const acumuladoController = require('../controllers/acumuladoController');

// Aplicar CORS a todas as rotas
router.use(cors());

// Rota única para a consulta de bolsas
router.route('/acumulado')
  .get(acumuladoController.pegaAcumulado)
  .post(express.json(), acumuladoController.pegaAcumulado);

module.exports = router;