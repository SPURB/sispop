<template>
  <div class="default">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from '~/components/sections/Header'
export default {
  name: 'Default',
  components: { Header },
  head () {
    return {
      title: 'SPUrbanismo | SISPOP',
      meta: [{ hid: 'SISPOP', name: 'SISPOP', content: 'Visualização de dados das Vistorias da São Paulo Urbanismo' }]
    }
  }
}
</script>
