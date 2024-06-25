export default defineNuxtPlugin({
  name: 'customFetch',
  parallel: true,
  async setup(nuxtApp) {
    const baseURL = nuxtApp.$config.public.base_url_external;

    const { token } = useAuth();

    const $customFetch = $fetch.create({
      baseURL,
      timeout: 5000,
      async onRequest({ options }) {
        // console.log("[fetch request]", request, options);

        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: `${token.value}`,
        }
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          navigateTo('/')
        }
      },
    })

    return {
      provide: {
        customFetch: $customFetch
      }
    }
  }
})


