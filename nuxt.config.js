const baseUrl = '/sispop/'
const apiBaseUrl = 'https://servicos.spurbanismo.sp.gov.br/triangulo/api/apivistorias/'

export default {
  mode: 'spa',
  target: 'static',
  env: {
    apiBaseUrl
  },
  head: {
    htmlAttrs: { lang: 'pt-br' },
    title: 'SISPOP da São Paulo Urbanismo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}favicon.ico` }
    ]
  },
  loading: { color: '#038375' },
  css: ['@/assets/variables.scss', '@/assets/theme.scss'],
  plugins: ['~/plugins/services'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  router: {
    base: baseUrl,
    fallback: true
  },
  pwa: {
    manifest: {
      name: 'SISPOP da São Paulo Urbanismo',
      lang: 'ptbr',
      short_name: 'São Paulo Urbanismo'
    }
  }
}
