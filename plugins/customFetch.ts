
export default defineNuxtPlugin(() => {
  const { token } = useAuth();
  const baseURL = useRuntimeConfig().public.base_url_external;

  const $customFetch = $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token.value}`,
    },
    timeout: 3000,
    // async onRequest({ request, options, error }) {
    //   console.log("[fetch request]", request, options);
    // },
    // async onRequestError({ request, options, error }) {
    //   // Log error
    //   console.log("[fetch request error]", request, error);
    // },
    // async onResponse({ request, response, options }) {
    //   // Log response
    //   console.log("[fetch response]", request, response.status, response.body);
    // },
    // async onResponseError({ request, response, options }) {
    //   // Log error
    //   console.log(
    //     "[fetch response error]",
    //     request,
    //     response.status,
    //     response.body
    //   );
    // },
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch
    }
  }
})


