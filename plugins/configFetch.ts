export default defineNuxtPlugin(() => {
    const { token } = useAuthState();

    const config = useRuntimeConfig()

    const $GET = $fetch.create({
        baseURL: config.public.base_url_external,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
        },
        method: 'GET'
    })

    const $POST = $fetch.create({
        baseURL: config.public.base_url_external,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
        },
        method: 'POST'
    })

    const $PUT = $fetch.create({
        baseURL: config.public.base_url_external,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
        },
        method: 'PUT'
    })

    const $DELETE = $fetch.create({
        baseURL: config.public.base_url_external,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
        },
        method: 'DELETE'
    })

    return {
        provide: {
            GET: $GET,
            POST: $POST,
            PUT: $PUT,
            DELETE: $DELETE
        }
    }
})