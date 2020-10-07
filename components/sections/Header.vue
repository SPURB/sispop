<template>
  <header class="header-nav">
    <router-link to="/">
      <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
    </router-link>
    <p class="header-nav__page-title">
      SISPOP
    </p>
    <p class="header-nav__page-title">
      <input v-model="id" type="text" @keypress.enter="newSearch">
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
      this.$router.push({ path: `/vistoria/${this.id}` })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/variables';

.header-nav {
  display: flex;
  justify-content: space-between;

  &__page-title {
    align-self: center;
  }
  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: center
  }
  .logo {
    width: 151px;
    margin-left: 22px;
  }
}
</style>
