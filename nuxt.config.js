require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'http://sushi.games/ogp.png' },
      {
        name: 'twitter:description',
        content: 'おすしサーバー - みんなでゲームを楽しむためのサーバーです。'
      },
      { name: 'twitter:title', content: 'おすしサーバー' },
      {
        hid: 'description',
        name: 'description',
        content: 'おすしサーバー - みんなでゲームを楽しむためのサーバーです。'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'おすしサーバー'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'http://sushi.games/' },
      { hid: 'og:title', property: 'og:title', content: 'おすしサーバー' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'おすしサーバー - みんなでゲームを楽しむためのサーバーです。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'http://sushi.games/ogp.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }],
  serverMiddleware: ['~/api/index'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: ['@/assets/scss/_variables.scss', '@/assets/scss/_global.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    GA_TOKEN: process.env.GA_TOKEN
  }
}
