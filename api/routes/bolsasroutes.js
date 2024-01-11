const { Router } = require('express');
const bolsasController = require('../controllers/bolsasController.js');
const cors = require('cors');
const router = Router();
const express = require('express');

// Aplicar CORS a todas as rotas
router.use(cors());

// Rota única para a consulta de bolsas
router.route('/bolsas')
  .get(bolsasController.pegaTodasAsBolsas)
  .post(express.json(), bolsasController.pegaTodasAsBolsas);

module.exports = router;