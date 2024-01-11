const bodyParser = require('body-parser')
const bolsas = require('./bolsasroutes')
const analistas = require('./analistaroutes')
const acumulado = require('./acumuladoroutes')
var cors = require('cors')


module.exports = app => {
    app.use(bodyParser.json())
    app.use(bolsas)
    app.use(cors())
    app.use(analistas)
    app.use(acumulado)
}