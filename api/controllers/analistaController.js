const { Sequelize, DataTypes , QueryTypes } = require('sequelize');

//informações do Banco de Dados
const sequelize = new Sequelize('banco', 'user', '123zxse', {
  host: 'xxx.xxx.x.x',
  dialect: 'mssql', // ou o dialect do seu banco de dados
});

class analistaController {
  static async pegaAnalistas(req, res) {
    try {
      // Lógica para requisições GET...
      const query = `SELECT 
      USUARIO.NOME AS ANALISTA,
      CONVENIO.RegNum AS 'CÓDIGO DO PROJETO',
      SUBSTRING(CONVENIO.TITULO, CHARINDEX('-', CONVENIO.TITULO) + 2, LEN(CONVENIO.TITULO)) as 'NOME DO PROJETO'
  FROM 
      convAssistente
  JOIN 
      USUARIO ON USUARIO.CODIGO = convAssistente.codUsuario 
      AND USUARIO.bloqueado = 0 
      AND USUARIO.DELETADO IS NULL
  JOIN 
      CONVENIO ON CONVENIO.numconv = convAssistente.numConv 
      AND CONVENIO.DELETADO IS NULL 
      AND CONVENIO.CodSituacaoProjeto = 2
  WHERE 
      convAssistente.deletado IS NULL 
      AND convAssistente.CodFundacao = 2 
  ORDER BY 
      USUARIO.NOME`;
      
      const todasAsBolsas = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      return res.status(200).json(todasAsBolsas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = analistaController;

