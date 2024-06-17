import { User } from '~/interfaces/User';
import { createError, eventHandler, getRequestHeader, H3Event } from 'h3';

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

    return JSON.parse(token).data as User
}

export default eventHandler(async (event: H3Event) => {
    const session = await useStorage().getItem('data:session')
    if (session) return session

    const authHeaderValue = getRequestHeader(event, 'authorization')
    if (typeof authHeaderValue === 'undefined') {
        throw createError({ statusCode: 403, statusMessage: 'Need to pass valid authorization header to access this endpoint' })
    }

    const decodeJwt = parseJwt(authHeaderValue)

    const res = await $fetch(`${useRuntimeConfig().public.base_url_external}/user/profile-picture?user_id=${decodeJwt.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeaderValue
        }
    })
    decodeJwt.profile_image = res as Buffer

    useStorage('data').setItem('session', decodeJwt)

    return decodeJwt
})
