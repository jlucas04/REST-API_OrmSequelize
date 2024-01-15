const { Sequelize, DataTypes , QueryTypes } = require('sequelize');

//informações do Banco de Dados
const sequelize = new Sequelize('banco', 'user', 'senha', {
  host: 'xxx.xxx.x.x', //Nesse caso pode utilizar o endereço IP
  dialect: 'mssql', // dialect do seu banco de dados
});

class acumuladoController {
  static async pegaAcumulado(req, res) {
    try {
        let dataInicio;
        let dataFim;
        if (req.method === 'POST') {
            // Lógica para requisições POST...
            console.log(req.body);
            dataInicio = req.body.dataInicio;
            dataFim = req.body.dataFim;
            console.log(req.params);
            // Restante do código para requisições POST...
          }

      // Lógica para requisições GET...
      const query = `select financeiro.codigo,financeiro.titulo as TITULO,financeiro.NOMEPESSOA,REPLACE(abs(financeiro.VALORLIQUIDO), '.', ',') as VALOR,CONVERT(VARCHAR(10), financeiro.DTLANCAMENTO , 103) as 'DATA DO LANÇAMENTO' , subHist.descricao as DESCRIÇÃO from financeiro
      join subHist on subHist.codhist=financeiro.codhist and financeiro.CODSUBHIST=subHist.codigo and  subHist.deletado is null
      where financeiro.DTCOMPENSACH between '${dataInicio}'and '${dataFim}'and financeiro.eh_pag_liquido_bolsa=1 and financeiro.DELETADO is null and financeiro.ehPagAjuste is null and financeiro.ehEstorno is null ;`;
      
      const todasAsBolsasAcumulado = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      return res.status(200).json(todasAsBolsasAcumulado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = acumuladoController;

