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
        const { jwt } = await readBody(event)

        const decodeJwt = parseJwt(jwt)

        const currentTime = Math.floor(Date.now() / 1000)

        if (currentTime > decodeJwt.exp) {
            const baseUrl = getBaseUrl(event)

            return await $fetch<{ jwt: string }>(`${baseUrl}/login/refresh`, {
                method: 'POST',
                body: {
                    jwt: jwt
                }
            })
        } else {
            return {
                jwt
            }
        }
    } catch (err) {
        console.error('Error fetching refresh data:', err)

        return null
    }
})