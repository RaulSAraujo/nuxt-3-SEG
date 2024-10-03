import type { User } from '~/interfaces/User';
import type { H3Event } from 'h3';
import { createError, eventHandler, getRequestHeader } from 'h3';

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
    const authHeaderValue = getRequestHeader(event, 'authorization')
    if (typeof authHeaderValue === 'undefined') {
        throw createError({ statusCode: 403, statusMessage: 'Need to pass valid authorization header to access this endpoint' })
    }

    const decodeJwt = parseJwt(authHeaderValue)

    const session = await useStorage<User>('data').getItem(`profile_${decodeJwt.id}`)

    setCookie(event, 'auth.user_name', session?.name ?? '')
    setCookie(event, 'auth.theme', `${session?.theme ?? ''}`)

    if (session) return session

    useStorage('data').setItem(`profile_${decodeJwt.id}`, decodeJwt)

    setCookie(event, 'auth.user_name', decodeJwt?.name ?? '')
    setCookie(event, 'auth.theme', `${decodeJwt?.theme ?? ''}`)

    return decodeJwt
})
