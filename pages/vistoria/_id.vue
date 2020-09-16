<template>
  <div class="vistoria">
    <div class="vistoria__voltar">
      <router-link tag="a" to="/">
        Voltar
      </router-link>
    </div>
    <main>
      <section class="header">
        <div class="header__titulo">
          <h1>{{ header.codigoLote }}</h1>
          <h2>
            {{
              header.sql + ' - ' +
                header.logradouro + ' , ' +
                header.cep + ' - N°' +
                header.numero
            }}
          </h2>
        </div>
        <div class="header__menu">
          <div class="header__menu--control">
            <button
              type="button"
              :disabled="!pagination ? true : false"
              :class="!pagination ? 'disabled' : ''"
              class="header__menu-nav"
              @click="pagination = false"
            >
              Anterior
            </button>
            <h3>
              {{ pagination ? '2 / 2' : '1 / 2' }}
            </h3>
            <button
              type="button"
              :class="pagination ? 'disabled' : ''"
              :disabled="pagination ? true : false"
              class="header__menu-nav"
              @click="pagination = true"
            >
              Próximo
            </button>
          </div>
          <div class="header__menu--salvar">
            <Create-PDF
              :header="header"
              :ficha="ficha"
              :caracterizacao="caracterizacao"
              :diagnostico="diagnostico"
              :pagina-dois="informacaoPgDois"
              :imagens="imagens"
            />
          </div>
        </div>
      </section>

      <template v-if="!pagination">
        <section class="grid-container">
          <div class="img img-main">
            <img :src="imagens.imagem_0">
          </div>
          <div class="img img-first">
            <img :src="imagens.imagem_1">
          </div>
          <div class="img img-second">
            <img :src="imagens.imagem_2">
          </div>
          <div class="img-third">
            <img :src="imagens.imagem_3">
          </div>
          <div class="img img-fourth">
            <img :src="imagens.imagem_4">
          </div>
          <div class="table">
            <h3 class="titulo-item">
              Ficha do Edifício
            </h3>
            <Table :ficha="ficha" />
          </div>
          <div class="caracterizacao">
            <h3 class="titulo-item">
              Caracterização
            </h3>
            <ul>
              <li>
                <span>Implantação e acessos:</span>
                {{ caracterizacao.implantacaoAcesso }}
              </li>
              <li>
                <span>Quantidade de pavimentos:</span>
                {{ caracterizacao.qtdPavimentos }}
              </li>
              <li>
                <span>Fachada e esquadrias:</span>
                {{ caracterizacao.fachadaEsquadrias }}
              </li>
              <li>
                <span>Elementos notáveis:</span>
                {{ caracterizacao.elementosNotaveis }}
              </li>
              <li>
                <span>Uso do térreo:</span>
                {{ caracterizacao.usoTerreo }}
              </li>
              <li>
                <span>Uso da edificação:</span>
                {{ caracterizacao.usoEdificacao }}
              </li>
            </ul>
            <h3 class="titulo-item top">
              Diagnóstico
            </h3>
            <ul>
              <li>
                <span>Patologias da paisagem:</span>
                {{ diagnostico.patologiaPaisagem }}
              </li>
              <li>
                <span>Patologias construtivas:</span>
                {{ diagnostico.patologiaConstrutiva }}
              </li>
            </ul>
          </div>
        </section>
      </template>
      <template v-else>
        <section class="grid-container-dois">
          <div class="img-main">
            <img :src="imagens.imagem_0">
          </div>
          <div class="dados-ambiencia">
            <ul>
              <li>
                <h3 class="titulo-item top">
                  Dados de Ambiência
                </h3>
                {{ informacaoPgDois.ambiencia }}
              </li>
              <li>
                <h3 class="titulo-item top">
                  Dados Históricos
                </h3>
                {{ informacaoPgDois.historicos }}
              </li>
              <li>
                <h3 class="titulo-item top">
                  Dados Arquiteônicos
                </h3>
                {{ informacaoPgDois.historicos }}
              </li>
            </ul>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script>
import CreatePDF from '~/components/elements/CreatePDF'
export default {
  name: 'Vistoria',
  layout: 'vistoria',
  components: {
    CreatePDF
  },
  async asyncData ({ params, $vistoria }) {
    try {
      const vistoria = await $vistoria.get(params.id)
      console.log(vistoria.data)
      return { vistoria: vistoria.data }
    } catch (err) {
      console.log(err)
    }
  },
  data: () => ({
    pagination: false,
    vistoria: []
  }),
  computed: {
    header () {
      return {
        codigoLote: this.vistoria.Imovel.Cadastro.NM_CODIGO_LOTE,
        sql: this.vistoria.Imovel.Cadastro.SQL,
        cep: this.vistoria.Imovel.Cadastro.NM_CEP,
        logradouro: this.vistoria.Imovel.Cadastro.NM_LOGRADOURO,
        numero: this.vistoria.Imovel.Cadastro.NM_NUMERO
      }
    },
    ficha () {
      const ficha = {
        nomeEdificio: this.vistoria.Imovel.NM_EDIFICIO || 'Não informado.',
        qtdPavimentos: this.vistoria.Imovel.NR_PAVIMENTOS || 'Não informado.',
        acessoDireto: this.vistoria.Imovel.NR_ACESSOS ? 'Sim.' : 'Não.',
        qtdAcessos: this.vistoria.Imovel.NR_ACESSOS > 0 ? this.vistoria.Imovel.NR_ACESSOS : 0
      }

      if (this.vistoria.Imovel.Pesquisas[0] !== undefined) {
        ficha.autorProjeto = this.vistoria.Imovel.Pesquisas[0].NM_AUTOR_PROJETO || 'Não informado.'
        ficha.imovelNotificado = this.vistoria.Imovel.Pesquisas[0].NM_IMOVEL_NOTIFICADO_PEUC || 'Não informado.'
        ficha.construtora = this.vistoria.Imovel.Pesquisas[0].NM_CONSTRUTORA || 'Não informado.'
        ficha.dataConstrucao = this.vistoria.Imovel.Pesquisas[0].DT_CONSTRUCAO || 'Não informada.'
        ficha.usoTerreo = this.vistoria.DescrUsoTerreo || 'Não informado.'
        ficha.usoEdificacao = this.vistoria.DescrUsoEdif || 'Não informado.'
      } else {
        ficha.autorProjeto = 'Não informado.'
        ficha.imovelNotificado = 'Não informado.'
        ficha.construtora = 'Não informado.'
        ficha.dataConstrucao = 'Não informado.'
        ficha.usoTerreo = 'Não informado.'
        ficha.usoEdificacao = 'Não informado.'
      }

      return ficha
    },
    caracterizacao () {
      const caracterizacao = {}

      if (this.vistoria.Imovel.Pesquisas[0] !== undefined) {
        const data = this.vistoria.Imovel.Pesquisas[0].NM_CARACTERIZACAO.split('.,')

        caracterizacao.implantacaoAcesso = data[0] !== undefined ? `${data[0]}.` : 'Não informado.'
        caracterizacao.qtdPavimentos = data[1] !== undefined ? `${data[1]}.` : 'Não informado.'
        caracterizacao.fachadaEsquadrias = data[2] !== undefined ? `${data[2]}.` : 'Não informado.'
        caracterizacao.elementosNotaveis = data[3] !== undefined ? `${data[3]}.` : 'Não informado.'
        caracterizacao.usoTerreo = data[4] !== undefined ? `${data[4]}.` : 'Não informado.'
        caracterizacao.usoEdificacao = data[5] !== undefined ? `${data[5]}.` : 'Não informado.'
      } else {
        caracterizacao.implantacaoAcesso = 'Não informado.'
        caracterizacao.qtdPavimentos = 'Não informado.'
        caracterizacao.fachadaEsquadrias = 'Não informado.'
        caracterizacao.elementosNotaveis = 'Não informado.'
        caracterizacao.usoTerreo = 'Não informado.'
        caracterizacao.usoEdificacao = 'Não informado.'
      }

      return caracterizacao
    },
    diagnostico () {
      const diagnostico = {}

      if (this.vistoria.Imovel.Pesquisas[0] !== undefined) {
        const data = this.vistoria.Imovel.Pesquisas[0].NM_DIAGNOSTICO.split('.,')

        diagnostico.patologiaPaisagem = data[0] !== undefined ? `${data[0]}.` : 'Não informado.'
        diagnostico.patologiaConstrutiva = data[1] !== undefined ? `${data[1]}.` : 'Não informado.'
      } else {
        diagnostico.patologiaPaisagem = 'Não informado.'
        diagnostico.patologiaConstrutiva = 'Não informado.'
      }

      return diagnostico
    },
    imagens () {
      return {
        imagem_0: `data:image;base64, ${this.vistoria.Imovel.IM_MAPA}`,
        imagem_1: `data:image;base64, ${this.vistoria.Imagens[0].IM_IMAGEM}`,
        imagem_2: `data:image;base64, ${this.vistoria.Imagens[1].IM_IMAGEM}`,
        imagem_3: `data:image;base64, ${this.vistoria.Imagens[2].IM_IMAGEM}`,
        imagem_4: `data:image;base64, ${this.vistoria.Imagens[3].IM_IMAGEM}`
      }
    },
    informacaoPgDois () {
      const informacaoPgDois = {}

      if (this.vistoria.Imovel.Pesquisas[0] !== undefined) {
        informacaoPgDois.ambiencia = this.vistoria.Imovel.Pesquisas[0].NM_DADOS_AMBIENCIA || 'Não informado.'
        informacaoPgDois.historicos = this.vistoria.Imovel.Pesquisas[0].NM_DADOS_HISTORICOS || 'Não informado.'
      } else {
        informacaoPgDois.ambiencia = 'Não informado.'
        informacaoPgDois.historicos = 'Não informado.'
      }

      return informacaoPgDois
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables';
.vistoria {
  background-color: $brand-1;

  &__preloader { padding-top: 4rem; }

  &__voltar {
    padding-top: 15px;
    a {
      text-decoration: none;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 5px;
      margin: 0px 0px 15px 15px;
      padding: .5rem;

      &:hover {
        background-color: #fff;
        color: $brand-1;
      }
    }
  }

  main {
    padding: 0 1rem 1rem 1rem;

    .header {
      padding: 1.5rem 0;
      width: 100%;
      display: flex;
      justify-content:space-between;

      @media (max-width: $tablet) {
        flex-direction: column;
      }

      &__titulo {
        h1 { color: #F7FAFC; font-size: 2rem; }
        h2 { color: #EDF2F7; font-size: 1.3rem;}
      }

      &__menu {
        @media (max-width: $tablet) {
          justify-content: space-between;
          margin-top: 1.5rem;
        }

        &--control {
          display: flex;
          align-items: center;
          color: #fff;

          @media (max-width: $tablet) {
            justify-content: space-between;
            margin-bottom: 5px;
          }
        }

        &--salvar {
          padding: 0 10px;

          @media (max-width: $tablet) {
            padding: 0;
          }
        }

        &-nav {
          color: #fff;
          background-color: $brand-2;
          border: 1px solid transparent;
          border-radius: 2px;
          padding: 5px;
          margin: 10px;

          @media (max-width: $tablet) {
            margin: 0px;
          }

          &:hover {
            cursor: pointer;
            background-color: transparent;
            border: 1px solid #fff;
          }

          &.disabled {
            opacity: 0.8;
            cursor: not-allowed;
            background-color: $brand-2;
            border: 1px solid transparent;
          }
        }
      }
    }

    .grid-container {
      display: grid;
      background-color: #fff;
      border-radius: 2px;
      padding: .8rem;
      grid-template-columns: 1fr 1fr 1fr 1fr 2.5fr;
      grid-template-rows: 0.5fr 0.5fr auto;
      gap: 1px 1px;
      grid-template-areas:
        "img-main img-main img-first img-second caracterizacao"
        "img-main img-main img-third img-fourth caracterizacao"
        "table table table table caracterizacao";

      @media (max-width: $tablet) {
        grid-template-columns: 1fr 1fr !important;
        gap: 1px 1px !important;
        grid-template-areas:
          "img-main img-main"
          "img-first img-second"
          "img-third img-fourth"
          "caracterizacao caracterizacao"
          "table table" !important;
      }

      .img-main {
        padding: .5rem .5rem .5rem 0rem;

        img {
          width: 100%;
          height: calc(446px - 1.5rem);

          @media (max-width: $tablet) {
            height: 300px;
          }
        }
      }
      .img-first, .img-second, .img-third, .img-fourth {
        padding: .5rem;

        @media (max-width: $tablet) {
          padding-left: 0;
        }

        img {
          width: 100%;
          height: 200px;

          @media (max-width: $tablet) {
            height: 150px;
          }
        }
      }

      .img-main { grid-area: img-main; }
      .img-first { grid-area: img-first; }
      .img-second { grid-area: img-second; }
      .img-third { grid-area: img-third; }
      .img-fourth { grid-area: img-fourth;}

      .caracterizacao {
        grid-area: caracterizacao;
        padding: .5rem;

        @media (max-width: $tablet) { padding: 0; }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          li {
            font-size: .8rem;
            span { font-weight: bold; }
          }
        }
      }
      .table {
        grid-area: table;

        @media (max-width: $tablet) {
          margin-top: 13px;
        }
      }
    }

    .grid-container-dois {
      background-color: #fff;
      border-radius: 2px;
      display: grid;
      grid-template-columns: .5fr 1fr;
      grid-template-rows: 1fr;
      gap: 1px 1px;
      grid-template-areas:
        "img-main dados-ambiencia"
        "img-main dados-ambiencia"
        ". dados-ambiencia";

      .img-main, .dados-ambiencia {
        padding: 1rem;
      }
      .img-main {
        img {
          width: 100%;
          height: auto;
        }
        width: 100%;
        height: 80vh;
        grid-area: img-main;
      }

      .dados-ambiencia {
        grid-area: dados-ambiencia;
        width: 100%;
        -webkit-columns: 50% 2;
        -moz-columns: 100px 2;
        columns: 100px 2;
        -webkit-column-gap: 1px;
        -moz-column-gap: 1px;
        column-gap: 20px;
        word-break: break-word;
        white-space: normal;
        text-align: justify;

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;

          li {
            font-size: .8rem;
            span { font-weight: bold; }
          }
        }
      }
    }
  }
}
.titulo-item {
  font-size: 1.2rem;
  margin-bottom: 13px;

  &.top { margin-top: 13px; }
}
</style>
