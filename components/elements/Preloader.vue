<template>
  <div class="preloader">
    <div v-if="isFetching" :class="{ faded: !isFetching }" class="is-loading" stroke="white">
      <preloader-animation v-if="!isIE" :is-fetching="isFetching" />
      <h2>Carregando</h2>
    </div>
    <div v-else-if="error" class="error">
      <h2>Erro</h2>
      <p>{{ error }}</p>
      <button @click.prevent="reloadApp(path)">
        <span>&#8635;</span>
        Tentar novamente
      </button>
    </div>
  </div>
</template>
<script>
import { PreloaderVerticalizacao as PreloaderAnimation } from '@spurb/componentes'
export default {
  name: 'Preloader',
  components: {
    PreloaderAnimation
  },
  props: {
    isFetching: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: '/'
    }
  },
  computed: {
    isIE () {
      const nav = window.navigator.userAgent
      if (nav.match(/MSIE\s\d\S*;|Trident.*rv:\d*\.\d/)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    reloadApp (path = '/') {
      path === '/' ? window.location.reload(true) : this.$router.push({ path })
    }
  }
}
</script>
<style lang="scss" scoped>
.is-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: #008375;
  color: #FFF;
  transition: all ease-in .4s .2s;
  flex-direction: column;
  h2 {
    font-size: 1rem;
    font-weight: normal;
    text-shadow: 0 2px 4px rgba(0, 0, 0, .36);
    transition: all ease-out .4s;
    user-select: none;
  }
  &.faded {
    max-height: 0;
    h2 {
      opacity: 0;
    };
  }
}
.error {
  padding: 2rem 3.25rem;
  background-color:#EB5757;
  h2 {
    color: #FFF;
    font-size: 1.5rem;
  }
  p {
    font-size: small;
    color: #FFF;
  }
  button {
    margin: 2rem 0 0;
    padding: 1.5rem 1.75rem 1.6rem;
    background-color: #005249;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 0.25rem;
    font-family: inherit;
    font-size: 1rem;
    color: #FFF;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .36);
    cursor: pointer;
    transition: all ease-out .1s;
    span {
      font-size: 1.25rem;
      line-height: 1.6rem;
    }
    &:hover { background-color: #008375 }
  }
}
</style>
