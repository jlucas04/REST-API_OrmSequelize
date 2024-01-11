async function consultarPessoas() {
  try{
    const response = await fetch(`http://localhost:3001/bolsas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    });

    const result = await response.json();

          // Construir a tabela com os resultados
  const table = document.getElementById('resultTable');
  table.innerHTML = '';

  // Cabeçalho da tabela
  const header = table.createTHead();
  const row = header.insertRow(0);
  Object.keys(result[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    row.appendChild(th);
  });

  // Linhas da tabela
  result.forEach(item => {
    const row = table.insertRow(-1);
    Object.values(item).forEach(value => {
      const cell = row.insertCell(-1);
      cell.textContent = value;
    });
  });
  }catch(error){
    console.log(error);
  }
}

async function consultanalistas() {
  try{
    const response = await fetch(`http://localhost:3001/analistas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    });

    const result = await response.json();

          // Construir a tabela com os resultados
  const table = document.getElementById('resultTable');
  table.innerHTML = '';

  // Cabeçalho da tabela
  const header = table.createTHead();
  const row = header.insertRow(0);
  Object.keys(result[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    row.appendChild(th);
  });

  // Linhas da tabela
  result.forEach(item => {
    const row = table.insertRow(-1);
    Object.values(item).forEach(value => {
      const cell = row.insertCell(-1);
      cell.textContent = value;
    });
  });
  }catch(error){
    console.log(error);
  }
}

async function consultarAcumulado() {
  const dataInicio = document.getElementById('dataInicio').value;
  const dataFim = document.getElementById('dataFim').value;
  try{
    const response = await fetch(`http://localhost:3001/acumulado`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dataInicio: dataInicio,
      dataFim: dataFim
    }),
    });

    const result = await response.json();

          // Construir a tabela com os resultados
  const table = document.getElementById('resultTable');
  table.innerHTML = '';

  // Cabeçalho da tabela
  const header = table.createTHead();
  const row = header.insertRow(0);
  Object.keys(result[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    row.appendChild(th);
  });

  // Linhas da tabela
  result.forEach(item => {
    const row = table.insertRow(-1);
    Object.values(item).forEach(value => {
      const cell = row.insertCell(-1);
      cell.textContent = value;
    });
  });
  }catch(error){
    console.log(error);
  }
}


function exportarParaExcel() {
  const table = document.getElementById('resultTable');
  const sheetName = 'Sheet 1';

  // Criar um objeto de estilo para formatar as células como texto
  const styleText = XLSX.utils.book_new();
  const styleSheet = XLSX.utils.aoa_to_sheet([["text"]]);
  XLSX.utils.book_append_sheet(styleText, styleSheet, sheetName);

  // Converter a tabela para livro com o estilo de texto
  const wb = XLSX.utils.table_to_book(table, { sheet: sheetName, bookType: 'xlsx', raw: true, bookSST: false, cellStyles: true });

  // Adicionar o estilo ao livro principal
  wb.Sheets[sheetName]['!cells'] = styleText.Sheets[sheetName]['!cells'];

  // Salvar o arquivo
  XLSX.writeFile(wb, 'tabela_excel.xlsx');
}