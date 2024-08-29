import colors from 'vuetify/lib/util/colors.mjs'
import { pt } from 'vuetify/locale'

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  typescript: {
    typeCheck: true
  },

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
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
  },

  devServer: {
    port: 3002,
    host: '0.0.0.0',
  },

  nitro: {
    experimental: {
      websocket: true
    }
  },

  runtimeConfig: {
    public: {
      base_url_local: process.env.API_URL_LOCAL,
      base_url_external: process.env.API_URL_EXTERNAL,
      key_weather: process.env.API_KEY_WEATHER,
      base_url_weather: process.env.BASE_URL_WEATHER,
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
    '@vueuse/nuxt',
    '@nuxt/test-utils',
    'nuxt-payload-analyzer',
  ],

  css: ['@/assets/style.css'],

  components: [

    { path: '~/components/utils', pathPrefix: false, global: true },
    { path: '~/components/utils/edit_dialog', pathPrefix: false, global: true, prefix: 'EditDialog' },

    '~/components'
  ],

  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      },
      locale: {
        locale: 'pt',
        messages: { pt }
      },
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
              surface: colors.grey.darken4,
              'surface-bright': '#272727',
              'surface-light': '#272727',
              'surface-variant': colors.grey.darken3,
              'on-surface-variant': colors.grey.lighten3,
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
              surface: colors.grey.lighten5,
              'surface-bright': colors.grey.lighten5,
              'surface-light': colors.grey.lighten4,
              'surface-variant': colors.grey.darken3,
              'on-surface-variant': colors.grey.lighten3,
              background: '#fafafa',
            }
          },
        }
      },
      labComponents: true
    },
  },

  auth: {
    isEnabled: true,
    baseURL: '/api/auth/',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/signIn', method: 'post' },
        signOut: { path: '/signOut', method: 'post' },
        getSession: { path: '/session', method: 'get' },
        // refresh: { path: '/refresh', method: 'post' }
      },
      pages: {
        login: '/',
      },
      token: {
        signInResponseTokenPointer: '/jwt',
        type: '',
        cookieName: 'auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 86400,
        sameSiteAttribute: 'lax',
      },
      sessionDataType: {
        id: 'number',
        name: 'string',
        username: 'string',
        active: 'boolean',
        is_admin: 'boolean',
        group_id: 'number',
        theme: 'boolean',
        top_menu: 'boolean',
        lateral_menu: 'boolean',
        created_at: 'Date | null',
        updated_at: 'Date | null',
        deleted_at: 'Date | null',
        profile_image: 'Buffer | null'
      }
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: false
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
    plugins: ['relativeTime', 'utc', 'timezone', 'customParseFormat'],
    defaultLocale: 'pt-br',
    defaultTimezone: 'America/Sao_Paulo',
  },

  sourcemap: {
    server: true,
    client: true
  }
})