import colors from 'vuetify/lib/util/colors.mjs'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    baseURL: '/',
    head: {
      title: 'Deltatec Integration',
      htmlAttrs: {
        lang: 'pt-br',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    },
  },

  runtimeConfig: {
    public: {
      base_url_external: process.env.API_URL_EXTERNAL,
      base_url_weather: process.env.BASE_URL_WEATHER,
      key_weather: process.env.API_KEY_WEATHER,
      base_url_local: process.env.API_URL_LOCAL,
      automation_base_url: process.env.BASE_URL_AUTOMATION,
    }
  },

  modules: [
    'vuetify-nuxt-module',
    "@nuxt/image",
    "@nuxt/eslint",
    "@vee-validate/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxt/fonts",
    "@pinia/nuxt",
    'dayjs-nuxt',
    '@vueuse/nuxt'
  ],

  css: ['@/assets/style.css'],

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          dark: {
            dark: true,
            colors: {
              primary: colors.blue.darken2,
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
            }
          },
          light: {
            dark: false,
            colors: {
              primary: colors.blue.darken2,
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
            }
          },
        }
      }
    }
  },

  auth: {
    baseURL: '/api/',
    provider: {
      type: 'refresh',
      endpoints: {
        signIn: { path: '/signIn', method: 'post' },
        signOut: { path: '/signOut', method: 'post' },
        getSession: { path: '/session', method: 'get' },
        refresh: { path: '/refresh', method: 'post' }
      },
      pages: {
        login: '/',
      },
      token: {
        signInResponseTokenPointer: '/jwt',
        type: '',
        maxAgeInSeconds: 60 * 60 * 3, // 5 min
        sameSiteAttribute: 'lax',
      },
      refreshToken: { signInResponseRefreshTokenPointer: '/jwt', refreshRequestTokenPointer: '/jwt' },
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },

  pinia: {
    storesDirs: ['./stores/**']
  },

  dayjs: {
    locales: ['pt-br'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'pt-br',
    defaultTimezone: 'America/Sao_Paulo',
  },

  sourcemap: {
    server: true,
    client: true
  }
})