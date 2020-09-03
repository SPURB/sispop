<template>
  <div class="vistoria">
    <template v-if="!isFetching">
      <main>
        <section class="header">
          <h1>SB01-A</h1>
          <h2>000.000.0000-00 Logradouro, n°00</h2>
        </section>
        <section class="grid-container">
          <div class="img-main">
            FOTO MAIN
          </div>
          <div class="img-first">
            FOTO 1
          </div>
          <div class="img-second">
            FOTO 2
          </div>
          <div class="img-third">
            FOTO 3
          </div>
          <div class="img-fourth">
            FOTO 4
          </div>
          <div class="table">
            <h3 class="titulo-item">
              Ficha técnica
            </h3>
            <Table />
          </div>
          <div class="caracterizacao">
            <h3 class="titulo-item">
              Caracterização
            </h3>
            <ul>
              <li><span>Implantação e acessos:</span> </li>
              <li><span>Quantidade de pavimentos:</span> </li>
              <li><span>Fachada e esquadrias:</span> </li>
              <li><span>Elementos notáveis:</span> </li>
              <li><span>Uso do térreo:</span> </li>
              <li><span>Uso da edificação:</span> </li>
            </ul>

            <h3 class="titulo-item top">
              Diagnóstico
            </h3>
            <ul>
              <li><span>Patologias da paisagem:</span> </li>
              <li><span>Patologias construtivas:</span> </li>
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
      const { data } = await $vistoria.get(params.id)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      isFetching: false
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
      grid-template-rows: 0.5fr 0.5fr 1.6fr;
      gap: 1px 1px;
      grid-template-areas:
        "img-main img-main img-first img-second caracterizacao"
        "img-main img-main img-third img-fourth caracterizacao"
        "table table table table caracterizacao";

      @media (max-width: $tablet) {
        grid-template-columns: 1fr 1fr !important;
        grid-template-columns: 0.8fr 0.8fr !important;
        gap: 1px 1px !important;
        grid-template-areas:
          "img-main img-main"
          "img-main img-main"
          "img-first img-second"
          "img-third img-fourth"
          "caracterizacao caracterizacao"
          "table table" !important;
      }
    }

    .img-main { grid-area: img-main; padding: .5rem; }
    .img-first { grid-area: img-first; padding: .5rem; }
    .img-second { grid-area: img-second; padding: .5rem; }
    .img-third { grid-area: img-third; padding: .5rem; }
    .img-fourth { grid-area: img-fourth; padding: .5rem; }
    .caracterizacao {
      grid-area: caracterizacao;
      padding: .5rem;

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
    .table { grid-area: table; }
  }
}
.titulo-item {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 13px;

  &.top { margin-top: 13px; }
}
</style>
