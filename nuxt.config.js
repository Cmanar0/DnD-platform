import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - dnd-platform',
    title: 'dnd-platform',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules

  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDNqgjC3zIUoZPHx4jVpeaCvZwV-hWbaIk',
          authDomain: 'dnd-platform.firebaseapp.com',
          projectId: 'dnd-platform',
          storageBucket: 'dnd-platform.appspot.com',
          messagingSenderId: '599133981873',
          appId: '1:599133981873:web:f134539f75068fca112690',
          measurementId: 'G-C3RY8WYWQL',
        },
        services: {
          auth: true, // Just as example. Can be any other service.
        },
      },
    ],
    '@nuxtjs/axios',
  ],
  // auth: {
  //   persistence: 'local', // default
  //   initialize: {
  //     onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
  //     onAuthStateChangedAction: 'onAuthStateChangedAction',
  //     subscribeManually: false,
  //   },
  //   ssr: false, // default
  //   emulatorPort: 9099,
  //   emulatorHost: 'http://localhost',
  // },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
