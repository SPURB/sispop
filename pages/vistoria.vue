<template>
  <div class="vistoria">
    <preloader :is-fetching="fetching" />
    <div class="vistoria__voltar">
      <router-link tag="a" to="/">
        Voltar
      </router-link>
    </div>
    <main v-if="!fetching">
      <section class="header">
        <div class="header__titulo">
          <h1>{{ header.codigoLote }}</h1>
          <h2>
            {{
              header.sql + ' - ' +
                header.logradouro + ' , ' +
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
            <img v-if="imagens.imagem_0.exist" :src="imagens.imagem_0.src">
            <div v-else class="default" />
          </div>
          <div class="img img-first">
            <img v-if="imagens.imagem_1.exist" :src="imagens.imagem_1.src">
            <div v-else class="default" />
          </div>
          <div class="img img-second">
            <img v-if="imagens.imagem_2.exist" :src="imagens.imagem_2.src">
            <div v-else class="default" />
          </div>
          <div class="img-third">
            <img :src="imagens.imagem_3.src">
          </div>
          <div class="img img-fourth">
            <img v-if="imagens.imagem_4.exist" :src="imagens.imagem_4.src">
            <div v-else class="default" />
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
            <img v-if="imagens.imagem_0.exist" :src="imagens.imagem_0.src">
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
                  Dados Arquitetônicos
                </h3>
                {{ informacaoPgDois.arquitetonicos }}
              </li>
            </ul>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script>
import Preloader from '~/components/elements/Preloader'
import CreatePDF from '~/components/elements/CreatePDF'
import ficha from '~/services/api-ficha'
export default {
  name: 'Vistoria',
  layout: 'vistoria',
  components: {
    CreatePDF,
    Preloader
  },
  async asyncData ({ query }) {
    let url = ''
    if (query.id) {
      url = `id=${query.id}`
    } else if (query.sql) { // 001081000200
      url = `s=${query.sql.slice(0, 3)}&q=${query.sql.slice(3, 6)}&l=${query.sql.slice(6, 10)}&cd=${query.sql.slice(10, 12)}`
    }

    const resInfo = await ficha.info(url)
    const resImagens = await ficha.imagens(url)
    const defaultImg = 'data:image;base64, iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAMAAACJuGjuAAAAA1BMVEX///+nxBvIAAABgUlEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuDw5IAAAAAAT9f92OQAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAlQCA4wABEIp+HAAAAABJRU5ErkJggg=='
    const vistoria = resInfo.data
    const imagens = {
      imagem_0: resImagens.data[0]
        ? { exist: true, src: `data:image;base64,${resImagens.data[0].IM_IMAGEM}` }
        : { exist: false, src: defaultImg },
      imagem_1: resImagens.data[1]
        ? { exist: true, src: `data:image;base64,${resImagens.data[1].IM_IMAGEM}` }
        : { exist: false, src: defaultImg },
      imagem_2: resImagens.data[2]
        ? { exist: true, src: `data:image;base64,${resImagens.data[2].IM_IMAGEM}` }
        : { exist: false, src: defaultImg },
      imagem_3: resImagens.data[3]
        ? { exist: true, src: `data:image;base64,${resImagens.data[3].IM_IMAGEM}` }
        : { exist: false, src: defaultImg },
      imagem_4: resImagens.data[4]
        ? { exist: true, src: `data:image;base64,${resImagens.data[4].IM_IMAGEM}` }
        : { exist: false, src: defaultImg }
    }
    return { vistoria, imagens, fetching: false }
  },
  data: () => ({
    pagination: false,
    fetching: true,
    vistoria: {},
    imagens: {}
  }),
  computed: {
    header () {
      return {
        codigoLote: this.vistoria.codigo,
        sql: this.vistoria.sql,
        logradouro: this.vistoria.logradouro,
        numero: this.vistoria.numEndereco
      }
    },
    ficha () {
      return {
        nomeEdificio: this.vistoria.nomeImovel || 'N/A.',
        qtdPavimentos: this.vistoria.qtdPavimentos || 'N/A.',
        acessoDireto: this.vistoria.qtdAcessoDireto ? 'Sim.' : 'Não.',
        qtdAtividades: this.vistoria.qtdAtividadesTerreo,
        matFachada: this.vistoria.materialPredomFachada || 'N/A.',
        usoTerreo: this.vistoria.usoTerreo || 'N/A.',
        usoEdificacao: this.vistoria.usoEdif || 'N/A.',
        autorProjeto: this.vistoria.autor || 'N/A.',
        imovelNotificado: this.vistoria.peuc || 'N/A.',
        dataConstrucao: this.vistoria.dataConstrucao || 'N/A.',
        qtdAcessos: this.vistoria.qtdAcessos || 0,
        construtora: this.vistoria.construtora || 'N/A.',
        legislacao: this.vistoria.leiTombamento || 'N/A.',
        tombamento: this.vistoria.tombamento || 'N/A.'
      }
    },
    caracterizacao () {
      const data = this.vistoria.caracterizacao.split('.,')
      return {
        exist: true,
        implantacaoAcesso: data[0] !== undefined ? `${data[0]}` : 'N/A.',
        qtdPavimentos: data[1] !== undefined ? `${data[1]}` : 'N/A.',
        fachadaEsquadrias: data[2] !== undefined ? `${data[2]}` : 'N/A.',
        elementosNotaveis: data[3] !== undefined ? `${data[3]}` : 'N/A.',
        usoTerreo: data[4] !== undefined ? `${data[4]}` : 'N/A.',
        usoEdificacao: data[5] !== undefined ? `${data[5]}` : 'N/A.'
      }
    },
    diagnostico () {
      const data = this.vistoria.diagnostico.split('.,')
      return {
        patologiaPaisagem: data[0] !== undefined ? `${data[0]}` : 'N/A.',
        patologiaConstrutiva: data[1] !== undefined ? `${data[1]}` : 'N/A.'
      }
    },
    informacaoPgDois () {
      return {
        ambiencia: this.vistoria.ambiencia || 'Não consta nas bases consultadas.',
        historicos: this.vistoria.historicos || 'Não consta nas bases consultadas.',
        arquitetonicos: this.vistoria.arquitetonicos || 'Não consta nas bases consultadas.'
      }
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
          max-height: 100%;
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
