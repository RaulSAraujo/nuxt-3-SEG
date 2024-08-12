import type { H3Event } from 'h3'

const parseJwt = (token: string) => {
    token = token.split('.')[1]

    token = token.replace('/-/g', '+')
    token = token.replace('/_/g', '/')
    switch (token.length % 4) {
        case 0:
            break
        case 2:
            token += '=='
            break
        case 3:
            token += '='
            break
        default:
            throw new Error('Invalid token')
    }

    token = (token + '===').slice(0, token.length + (token.length % 4))
    token = token.replace(/-/g, '+').replace(/_/g, '/')

    token = decodeURIComponent(
        escape(Buffer.from(token, 'base64').toString('binary'))
    )

    return JSON.parse(token)
}

const getBaseUrl = (event: H3Event) => {
    const hostReq = getRequestHeader(event, 'host')

    const host = hostReq || window.location.hostname;

    let baseURL = useRuntimeConfig().public.base_url_local as string;
    if (host.includes('ddns')) {
        baseURL = useRuntimeConfig().public.base_url_external as string;
    }

    return baseURL
}

export default defineEventHandler(async (event) => {
    try {
        const authHeaderValue = getRequestHeader(event, 'authorization')
        if (typeof authHeaderValue === 'undefined') {
            throw createError({ statusCode: 403, statusMessage: 'Need to pass valid authorization header to access this endpoint' })
        }

        const decodeJwt = parseJwt(authHeaderValue)

        const currentTime = Math.floor(Date.now() / 1000)

        if (currentTime > decodeJwt.exp) {
            const baseUrl = getBaseUrl(event)

            const response = await $fetch(`${baseUrl}/login/refresh`, {
                method: 'POST',
                body: JSON.stringify({
                    jwt: authHeaderValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response
        } else {
            return {
                jwt: authHeaderValue
            }
        }
    } catch (err) {
        console.error('Error fetching login data:', err)
        return null
    }
})