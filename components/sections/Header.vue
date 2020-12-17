<template>
  <header class="header-nav">
    <router-link to="/">
      <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
    </router-link>
    <p class="header-nav__page-title">
      SISPOP
    </p>
    <p class="header-nav__page-input">
      <input
        v-model="id"
        type="search"
        placeholder="Insira o ID da vistoria"
        @keypress.enter="newSearch"
      >
    </p>
  </header>
</template>

<script>
import { Logo as LogoSpurb } from '@spurb/componentes'

export default {
  name: 'Header',
  components: { LogoSpurb },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    newSearch () {
      this.$router.push({ path: `/vistoria?id=${this.id}` })
      this.id = ''
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/variables';

.header-nav {
  display: flex;
  justify-content: space-between;

  @media (max-width: $tablet) {
    flex-direction: column;
    padding-bottom: 5px;
  }

  &__page {
    &-title, &-input {
     align-self: center;
    }

    &-input {
      padding-right: 2rem;

      @media (max-width: $tablet) {
        padding-right: 0;
        margin-top: 5px;
      }

      input {
        max-width: 100%;
        height: 30px;
        border-radius: 2px;
        border: 1px solid #ccc;
        padding: 5px;
      }
    }
  }
  .logo {
    width: 151px;
    margin-left: 22px;
  }
}
</style>
