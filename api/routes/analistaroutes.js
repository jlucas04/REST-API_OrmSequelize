const { Router } = require('express');
//const bolsasController = require('../controllers/analistaController');
const cors = require('cors');
const router = Router();
const express = require('express');
const analistaController = require('../controllers/analistaController');

// Aplicar CORS a todas as rotas
router.use(cors());

// Rota única para a consulta de bolsas
router.route('/analistas')
  .get(analistaController.pegaAnalistas)
  .post(express.json(), analistaController.pegaAnalistas);

module.exports = router;