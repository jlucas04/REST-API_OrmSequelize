const { Sequelize, DataTypes , QueryTypes } = require('sequelize');
const iconv = require('iconv-lite');

//informações do Banco de Dados
const sequelize = new Sequelize('banco', 'user', '123zxse', {
  host: 'xxx.xxx.x.x',
  dialect: 'mssql', // ou o dialect do seu banco de dados
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
      collate: 'Latin1_General_CI_AS',
      charset: 'utf8', // ou charset: 'latin1'
    },
  },
});

class bolsasController {
  static async pegaTodasAsBolsas(req, res) {
    try {
      // Lógica para requisições GET...
      const query = `SELECT
      admissao.matricula as MATRICULA,
      admissao.descricao as NOME,
      admissao.cgc_cpf as CPF,
      admissao.sexo as SEXO,
      REPLACE(admissao.salario, '.', ',') AS VALOR,
      CAST(paf.quant AS INT) AS QUANTIDADE,
      FORMAT(paf.quant * paf.valor, 'N2', 'pt-BR') AS 'VALOR TOTAL',
      CONVERT(VARCHAR(10), admissao.dtnascimento, 103) AS 'DATA NASCIMENTO',
      subhist.descricao AS DESCRIÇÃO,
      convenio.titulo AS PROJETO,
      CONVERT(VARCHAR(10), admissao.dtInicioCont, 103) AS 'DATA INICIAL',
      --CONVERT(VARCHAR(10), admissao.dtTermCont, 103) AS data2,
      --CONVERT(VARCHAR(10), admissao.dtTerminoContrato_2, 103) AS data3,
      CONVERT(VARCHAR(10), 
          CASE
              WHEN TRY_CAST(admissao.dtTerminoContrato_2 AS DATE) = '1899-12-30' 
              THEN admissao.dtTermCont
              ELSE admissao.dtTerminoContrato_2
          END, 103) AS 'DATA FINAL'
  FROM
      admissao
  JOIN
      convenio ON convenio.numconv = admissao.numconv
  JOIN
      paf ON paf.codigo = admissao.codItemPaf AND paf.deletado IS NULL
  JOIN
      subhist ON subhist.codigo = paf.codsubhist AND subhist.deletado IS NULL
  WHERE
      admissao.deletado IS NULL
      AND admissao.bolsista_rh = 1
      AND admissao.dtdemissao IS NULL
      AND inativo = 0;
  `;
      
      const todasAsBolsas = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      //converter para UTF-8
      const jsonData = iconv.decode(todasAsBolsas, 'latin1').toString('utf-8');

      return res.status(200).json(jsonData);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = bolsasController;

