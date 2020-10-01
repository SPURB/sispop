<template>
  <button type="button" @click="createPDF">
    Salvar como .pdf
  </button>
</template>

<script>
export default {
  name: 'CreatePDF',
  props: {
    header: {
      type: Object,
      required: true
    },
    ficha: {
      type: Object,
      required: true
    },
    caracterizacao: {
      type: Object,
      required: true
    },
    diagnostico: {
      type: Object,
      required: true
    },
    imagens: {
      type: Object,
      required: true
    },
    paginaDois: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      spurbanismoBase64: 'data:image;base64,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'
    }
  },
  methods: {
    lengthCalc (str, str2) {
      const total = str.length + str2.length
      if (total > 561) {
        const continuos = str2.substr(561 - total)
        const newString = str2.slice(0, 561 - total)
        console.log(continuos, newString)
      } else {
        console.log('normal')
      }
    },
    buildTabela (conteudo) {
      return {
        fontSize: 8.5,
        width: '67.6%',
        table: {
          widths: ['25%', '25%', '25%', '22.5%'],
          body: [
            ['', '', '', ''],
            [{ text: 'Nome do edifício', bold: true }, conteudo.nomeEdificio, '', ''],
            [
              { text: 'Autor do projeto', bold: true }, conteudo.autorProjeto,
              { text: 'Construtora', bold: true }, conteudo.construtora
            ],
            [
              { text: 'Quantidade de pavimentos', bold: true }, conteudo.qtdPavimentos,
              { text: 'Acesso direto aos demais pavimentos direto da rua?', bold: true }, conteudo.acessoDireto
            ],
            [
              { text: 'Imóvel notificado (PEUC)', bold: true }, conteudo.imovelNotificado,
              { text: 'Data de construção', bold: true }, conteudo.dataConstrucao
            ],
            [
              { text: 'Tombamento', bold: true },
              'Área envoltória / Tombado',
              { text: 'Legislação incidente', bold: true }, 'Res. n° 00/0000 (CONPRESP)'
            ],
            [
              { text: 'Uso da edificação', bold: true }, conteudo.usoEdificacao,
              { text: 'Uso do térreo', bold: true }, conteudo.usoTerreo
            ],
            [
              { text: 'Quantidade de acessos direto da via', bold: true }, '00',
              { text: 'Quantidade de atividades no térreo', bold: true }, '00'
            ],
            [
              { text: 'Material predominante da fachada', bold: true },
              'Material predominante da fachada',
              '', ''
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    },
    caracterizacaoBody (conteudo) {
      return [
        { style: 'itemTitulo', text: 'Caracterização' },
        {
          style: 'item',
          text: [
            { text: 'Implantação e acessos: ', bold: true },
            conteudo.implantacaoAcesso
          ]
        },
        {
          style: 'item',
          text: [
            { text: 'Quantidade de pavimentos: ', bold: true },
            conteudo.qtdPavimentos
          ]
        },
        {
          style: 'item',
          text: [
            { text: 'Fachada e esquadrias: ', bold: true },
            conteudo.fachadaEsquadrias
          ]
        },
        {
          style: 'item',
          text: [
            { text: 'Elementos notáveis: ', bold: true },
            conteudo.elementosNotaveis
          ]
        },
        {
          style: 'item',
          text: [{ text: 'Uso do térreo: ', bold: true }, conteudo.usoTerreo]
        },
        {
          style: 'item',
          text: [
            { text: 'Uso da edificação: ', bold: true },
            conteudo.usoEdificao
          ]
        }
      ]
    },
    diagnosticoBody (conteudo) {
      return [
        { style: ['itemTitulo', 'mgLeft'], text: 'Diagnóstico' },
        {
          alignment: 'justify',
          style: ['item', 'mgLeft'],
          text: [
            { text: 'Patologias da paisagem: ', bold: true },
            conteudo.patologiaPaisagem
          ]
        },
        {
          alignment: 'justify',
          style: ['item', 'mgLeft'],
          text: [
            { text: 'Patologias construtivas: ', bold: true },
            conteudo.patologiaConstrutiva
          ]
        }
      ]
    },
    itemsPaginaDois (titulo, conteudo) {
      return [
        { style: ['itemTitulo'], text: titulo },
        {
          alignment: 'justify',
          style: ['item'],
          text: conteudo
        }
      ]
    },
    loadExternalLib (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onload = () => {
          resolve(`${url} está pronta`)
        }
        script.async = true
        script.src = url
        document.head.appendChild(script)
      })
    },
    async createPDF () {
      try {
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js'
        )
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'
        )

        const caracterizacao = this.caracterizacaoBody(this.caracterizacao)
        const diagnostico = this.diagnosticoBody(this.diagnostico)
        const ambiencia = this.itemsPaginaDois('Dados de Ambiência', this.paginaDois.ambiencia)
        const historicos = this.itemsPaginaDois('Dados Históricos', this.paginaDois.historicos)
        const arquitetonicos = this.itemsPaginaDois('Dados Arquitetônicos')
        const tabela = this.buildTabela(this.ficha)

        const sectionC = {
          width: this.caracterizacao.exist ? 'auto' : '100%',
          alignment: 'justify',
          columns: [caracterizacao]
        }
        const content = {
          pageOrientation: 'landscape',
          content: [
            {
              style: 'titulo',
              text: this.header.codigoLote
            },
            {
              style: 'subtitulo',
              text: this.header.sql + ' - ' +
                this.header.logradouro + ' - N°' +
                this.header.numero
            },
            {
              columns: [
                {
                  columns: [
                    {
                      image: this.imagens.imagem_0.src,
                      width: 250,
                      height: 220
                    },
                    [
                      {
                        image: this.imagens.imagem_1.src,
                        width: 100,
                        height: 100
                      },
                      {
                        margin: [0, 20, 0, 0],
                        image: this.imagens.imagem_2.src,
                        width: 100,
                        height: 100
                      }
                    ],
                    [
                      {
                        image: this.imagens.imagem_3.src,
                        width: 100,
                        height: 100
                      },
                      {
                        margin: [0, 20, 0, 0],
                        image: this.imagens.imagem_4.src,
                        width: 100,
                        height: 100
                      }
                    ]
                  ]
                },
                sectionC
              ]
            },
            {
              bold: true,
              marginTop: 7,
              text: 'Ficha do Edifício'
            },
            {
              columns: [
                tabela,
                diagnostico
              ],
              pageBreak: 'after'
            },
            {
              style: 'titulo',
              text: this.header.codigoLote
            },
            {
              style: 'subtitulo',
              text: this.header.sql + ' - ' +
                this.header.logradouro + ' - N°' +
                this.header.numero
            },
            {
              columns: [
                {
                  image: this.imagens.imagem_0.src,
                  width: 300,
                  height: 250
                },
                {
                  columns: [
                    [ambiencia, historicos]
                  ]
                },
                arquitetonicos
              ]
            }
          ],
          header: (currentPage, pageCount) => {
            return {
              columns: [
                {
                  image: this.spurbanismoBase64,
                  width: 100,
                  marginTop: 25,
                  marginLeft: 40
                },
                {
                  alignment: 'right',
                  text: currentPage.toString() + ' de ' + pageCount,
                  marginTop: 25,
                  marginRight: 40
                }
              ]
            }
          },
          styles: {
            header: {
              fontSize: 18,
              alignment: 'left',
              bold: true
            },
            titulo: {
              margin: [0, 25, 0, 0],
              fontSize: 20,
              bold: true
            },
            subtitulo: {
              fontSize: 15,
              marginBottom: 5
            },
            itemTitulo: {
              fontSize: 12,
              marginBottom: 10,
              bold: true
            },
            item: {
              marginBottom: 5,
              fontSize: 10
            },
            mgLeft: { marginLeft: -12 },
            mgTop: { marginTop: 5 },
            mgBottom: { marginBottom: 10 }
          },
          defaultStyle: {
            columnGap: 20
          }
        }

        window.pdfMake.createPdf(content).download('teste')
      } catch (error) {
        console.log(error)
      } finally {
        // this.pdf.loading = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~/assets/variables';
button {
  color: #fff;
  background-color: $brand-2;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 5px;
  width: 100%;

  &:hover {
    cursor: pointer;
    border: 1px solid #fff;
  }
}
</style>
