// import router from "./router";
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#F65151' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/theme/index.css',
    '~/assets/css/main.css',
    // 'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    '~/assets/font/iconfont.css',
  ],

  router: {
    middleware: ['authorities']
    // extendRoutes: router
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/dayjs',
    { src: "@/plugins/vue-awesome-swiper", ssr: false },
    { src: '@/plugins/utils.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // { src: '~plugins/mockjs', ssr: true }
  ],
  proxy: {
    "/api":{
      target:"https://shop.shuwuya.cn/api.html",    //  key(路由前缀)：value(代理地址)https://shop.shuwuya.cn http://127.0.0.1:80
      // changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/api/': '' //路径重写
      }
    }
  },
  // 修改服务端端口
  // server: {
  //   port: 80, // default: 3000
  //   host: '127.0.0.1', // default: localhost
  // },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
