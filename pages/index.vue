<template>
  <div ref="index" class="index">
    <section class="index__landing landing">
      <logo-spurb :fill-type="'#fff'" :fill-brand="'#fff'" />
      <p class="index__caption">
        <b>SISPOP</b><br>
        Visualização de dados para das Vistorias da São Paulo Urbanismo
      </p>
      <a class="landing__controller" @click.prevent="scrollTo('formulario')">
        <seta :horizontal="true" />
      </a>
    </section>
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
import LogoSpurb from '~/components/icons/LogoSpurb'
import Seta from '~/components/icons/Seta'
import Footer from '~/components/sections/Footer'

export default {
  name: 'Index',
  layout: 'home',
  components: {
    LogoSpurb,
    Seta,
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
  },
  methods: {
    scrollTo (ref, reset = false) {
      const elHeight = reset ? 0 : this.$refs[ref].clientHeight
      try {
        window.scrollTo({
          top: elHeight,
          left: 0,
          behavior: 'smooth'
        })
      } catch {
        throw new Error('Could not scroll')
      }
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
.index__landing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.formulario {
  background-color: #E2E8F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  &--label, &--input, &--btn {
    margin-bottom: 0.5rem;
    width: 30%;
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

.landing {
  height: 100vh;
  background-color: $brand-1;
  .logo {
    margin-top: auto
  }
  p {
    margin: 1.5rem 1rem auto;
    color: #ffffff;
    text-align: center;
  }
  a {
    height: 52px;
    margin: 0 auto;
    &:hover {
      cursor: pointer
    }
  }
}
</style>
