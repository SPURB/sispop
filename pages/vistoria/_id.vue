<template>
  <div class="vistoria">
    <template v-if="!isFetching">
      <main>
        <section class="header">
          <h1>{{ header.codigoLote }}</h1>
          <h2>
            {{
              header.sql + ' - ' +
                header.logradouro + ' , ' +
                header.cep + ' - N°' +
                header.numero
            }}
          </h2>
        </section>
        <section class="grid-container">
          <div class="img img-main">
            <img :src="imagens.imagePrincipal">
          </div>
          <div class="img img-first">
            <img :src="imagens.imageSecundaria_1.ImagePathBase64">
          </div>
          <div class="img img-second">
            <img :src="imagens.imageSecundaria_2.ImagePathBase64">
          </div>
          <div class="img-third">
            <img :src="imagens.imageSecundaria_3.ImagePathBase64">
          </div>
          <div class="img img-fourth">
            <img :src="imagens.imageSecundaria_4.ImagePathBase64">
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
      </main>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Vistoria',
  layout: 'vistoria',
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
    isFetching: false,
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
        nomeEdificio: this.vistoria.Imovel.NM_EDIFICIO || 'Não informado',
        qtdPavimentos: this.vistoria.Imovel.NR_PAVIMENTOS || 'Não informado',
        acessoDireto: this.vistoria.Imovel.NR_ACESSOS ? 'Sim' : 'Não'
      }

      if (this.vistoria.Imovel.Pesquisas[0] !== undefined) {
        ficha.autorProjeto = this.vistoria.Imovel.Pesquisas[0].NM_AUTOR_PROJETO || 'Não informado'
        ficha.imovelNotificado = this.vistoria.Imovel.Pesquisas[0].NM_IMOVEL_NOTIFICADO_PEUC || 'Não informado'
        ficha.construtora = this.vistoria.Imovel.Pesquisas[0].NM_CONSTRUTORA || 'Não informado'
        ficha.dataConstrucao = this.vistoria.Imovel.Pesquisas[0].DT_CONSTRUCAO || 'Não informada'
      } else {
        ficha.autorProjeto = 'Não informado'
        ficha.imovelNotificado = 'Não informado'
        ficha.construtora = 'Não informado'
        ficha.dataConstrucao = 'Não informado'
      }

      return ficha
    },
    caracterizacao () {
      const caracterizacao = {}

      if (this.vistoria.Imovel.Pesquisas[0] !== undefined) {
        const data = this.vistoria.Imovel.Pesquisas[0].NM_CARACTERIZACAO.split('.,')

        caracterizacao.implantacaoAcesso = `${data[0]}.` || 'Não informado.'
        caracterizacao.qtdPavimentos = `${data[1]}.` || 'Não informado.'
        caracterizacao.fachadaEsquadrias = `${data[2]}.` || 'Não informado.'
        caracterizacao.elementosNotaveis = `${data[3]}.` || 'Não informado.'
        caracterizacao.usoTerreo = `${data[4]}.` || 'Não informado.'
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

        diagnostico.patologiaPaisagem = `${data[0]}.` || 'Não informado.'
        diagnostico.patologiaConstrutiva = `${data[1]}.` || 'Não informado.'
      } else {
        diagnostico.patologiaPaisagem = 'Não informado'
        diagnostico.patologiaConstrutiva = 'Não informado'
      }

      return diagnostico
    },
    imagens () {
      return {
        imagePrincipal: this.vistoria.Imovel.ImagePathBase64,
        imageSecundaria_1: this.vistoria.Imagens[0],
        imageSecundaria_2: this.vistoria.Imagens[1],
        imageSecundaria_3: this.vistoria.Imagens[2],
        imageSecundaria_4: this.vistoria.Imagens[3]
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

  main {
    padding: 2.5rem 1rem;

    .header {
      padding: 1.5rem 0;
      h1 { color: #F7FAFC; font-size: 2rem; }
      h2 { color: #EDF2F7; font-size: 1.3rem;}
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
}
.titulo-item {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 13px;

  &.top { margin-top: 13px; }
}
</style>
