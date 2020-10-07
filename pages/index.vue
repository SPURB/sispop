<template>
  <div ref="index" class="index">
    <nav class="landing">
      <logo class="landing__logo" fill-type="white" fill-brand="white" :opacity="1" />
      <section class="landing__title">
        <h1>SISPOP</h1>
        <p>Dados de vistorias da São Paulo Urbanismo</p>
      </section>
    </nav>
    <section ref="formulario" class="formulario">
      <label for="idvistoria" class="formulario--label">
        Informe o ID da vistoria:
      </label>
      <input
        id="idvistoria"
        v-model="id"
        type="text"
        class="formulario--input"
      >
      <router-link v-if="id > 0" :to="`/vistoria/${id}`" tag="button" class="formulario--btn">
        Visualizar
      </router-link>
      <button v-else type="button" class="formulario--btn block">
        Visualizar
      </button>
    </section>
    <section class="footer">
      <Footer />
    </section>
  </div>
</template>

<script>
import { Logo } from '@spurb/componentes'
import Footer from '~/components/sections/Footer'

export default {
  name: 'Index',
  layout: 'home',
  components: {
    Logo,
    Footer
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    isValid () {
      return this.id > 0
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/variables';

.index {
  &__caption {
    max-width: 600px;

    b {
      font-size: 2rem;
    }
  }
}
.formulario,
.landing {
  background-color: #E2E8F0;
  display: flex;
}
.landing {
  padding: 1rem;
  justify-content: space-between;
  align-items: end;
  background-color:$brand-1;
  color: white;
  &__logo {
    max-width: 150px;
  }
  h1, p {
    text-align: right;
  }
  p {
    font-size: small;
  }
}

.formulario {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);

  &--label, &--input, &--btn {
    margin-bottom: 0.5rem;
    width: 30%;
    @media (max-width: $tablet) {
      width: 80%;
    }
  }

  &--input, &--btn {
    border: none;
    height: 40px;
    border-radius: 2px;
    font-size: 13pt;
  }

  &--label {
    font-weight: 700;
    color: #4A5568;
  }

  &--btn {
    background-color: $brand-1;
    color: #fff;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &.block {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
