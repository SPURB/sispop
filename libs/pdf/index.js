const pdfSem = (header, caracterizacao, diagnostico, ambiencia, historicos, arquitetonicos, tabela, imagens) => {
  return {
    content: [
      {
        marginBottom: 12,
        table: {
          widths: ['50%', '50%'],
          body: [
            [
              { text: header.codigoLote, fontSize: 33, bold: true },
              { text: header.codigoLote, fontSize: 33, bold: true, alignment: 'right', marginRight: 30 }
            ],
            [
              { text: header.sql + ' - ' + header.logradouro + ' - N°' + header.numero, fontSize: 20 },
              { text: header.sql + ' - ' + header.logradouro + ' - N°' + header.numero, fontSize: 20, alignment: 'right', marginRight: 30 }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        image: imagens.imagem_0.src,
        width: 350,
        height: 318
      },
      {
        image: imagens.imagem_1.src,
        width: 150,
        height: 150,
        absolutePosition: { x: 450, y: 107 }
      },
      {
        image: imagens.imagem_2.src,
        width: 150,
        height: 150,
        absolutePosition: { x: 620, y: 107 }
      },
      {
        image: imagens.imagem_3.src,
        width: 150,
        height: 150,
        absolutePosition: { x: 450, y: 275 }
      },
      {
        image: imagens.imagem_4.src,
        width: 150,
        height: 150,
        absolutePosition: { x: 620, y: 275 }
      },
      {
        text: 'Ficha do Edifício',
        fontSize: 15,
        bold: true,
        marginTop: 15
      },
      {
        fontSize: 14,
        marginTop: 10,
        table: {
          widths: ['8%', '8%', '8%', '7.7%'],
          body: [
            ['', '', '', ''],
            [{ text: 'Nome do edifício', bold: true }, tabela.nomeEdificio, '', ''],
            [
              { text: 'Autor do projeto', bold: true }, tabela.autorProjeto,
              { text: 'Construtora', bold: true }, tabela.construtora
            ],
            [
              { text: 'Quantidade de pavimentos', bold: true }, tabela.qtdPavimentos,
              { text: 'Acesso direto aos demais pavimentos direto da rua?', bold: true }, tabela.acessoDireto
            ],
            [
              { text: 'Imóvel notificado (PEUC)', bold: true }, tabela.imovelNotificado,
              { text: 'Data de construção', bold: true }, tabela.dataConstrucao
            ],
            [
              { text: 'Tombamento', bold: true }, tabela.tombamento,
              { text: 'Legislação incidente', bold: true }, tabela.legislacao
            ],
            [
              { text: 'Uso da edificação', bold: true }, tabela.usoEdificacao,
              { text: 'Uso do térreo', bold: true }, tabela.usoTerreo
            ],
            [
              { text: 'Quantidade de acessos direto da via', bold: true }, tabela.qtdAcessos,
              { text: 'Quantidade de atividades no térreo', bold: true }, tabela.qtdAtividades
            ],
            [
              { text: 'Material predominante da fachada', bold: true }, tabela.matFachada,
              '', ''
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      {
        absolutePosition: { x: 800, y: 107 },
        width: 300,
        table: {
          widths: ['25%'],
          body: [
            [{ text: 'Caracterização', bold: true, fontSize: 14, marginBottom: 10 }],
            [
              {
                style: 'texto2',
                text: [{ text: 'Implantação e acessos: ', bold: true }, caracterizacao.implantacaoAcesso]
              }
            ],
            [
              {
                style: 'texto2',
                text: [{ text: 'Quantidade de pavimentos: ', bold: true }, caracterizacao.qtdPavimentos]
              }
            ],
            [
              {
                style: 'texto2',
                text: [{ text: 'Fachada e esquadrias: ', bold: true }, caracterizacao.fachadaEsquadrias]
              }
            ],
            [
              {
                style: 'texto2',
                text: [{ text: 'Elementos notáveis: ', bold: true }, caracterizacao.elementosNotaveis]
              }
            ],
            [
              {
                style: 'texto2',
                text: [{ text: 'Uso do térreo: ', bold: true }, caracterizacao.usoTerreo]
              }
            ],
            [
              {
                style: 'texto2',
                text: [{ text: 'Uso da edificação: ', bold: true }, caracterizacao.usoEdificacao]
              }
            ],
            [{ text: 'Diagnóstico', bold: true, fontSize: 14, marginBottom: 10, marginTop: 20 }],
            [
              {
                style: 'texto2',
                text: [{ text: 'Patologias da paisagem: ', bold: true }, diagnostico.patologiaPaisagem]
              }
            ],
            [
              {
                style: 'texto2',
                text: [{ text: 'Patologias construtivas: ', bold: true }, diagnostico.patologiaConstrutiva]
              }
            ]
          ]
        },
        layout: 'noBorders'
      },
      {
        absolutePosition: { x: 1300, y: 107 },
        width: 300,
        table: {
          widths: ['47%', '49%'],
          padding: 22,
          body: [
            [
              [
                { text: 'Dados de Ambiência', bold: true, fontSize: 14, marginBottom: 10 },
                { style: 'texto2', text: ambiencia },
                { text: 'Dados Arquitetônicos', bold: true, fontSize: 14, marginBottom: 10, marginTop: 10 },
                { style: 'texto2', text: arquitetonicos }
              ],
              [
                { text: 'Dados Históricos', bold: true, fontSize: 14, marginBottom: 10, marginLeft: 20 },
                { style: 'texto2', marginLeft: 20, text: historicos }
              ]
            ]
          ]
        },
        layout: 'noBorders'
      }
    ],
    pageSize: {
      width: 2245,
      height: 794
    },
    pageMargins: [75, 25, 75, 25],
    styles: {
      texto2: {
        alignment: 'justify',
        marginBottom: 3,
        fontSize: 12,
        lineHeight: 1.2
      }
    }
  }
}

export { pdfSem }
