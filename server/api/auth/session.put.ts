import type { User } from '~/interfaces/User';
import type { H3Event } from 'h3';
import { eventHandler } from 'h3';

export default eventHandler(async (event: H3Event) => {
    const body = await readBody(event)

    const session = await useStorage('data').getItem(`profile_${body.id}`) as User
    if (!session) return

    session.theme = body.theme as boolean

    useStorage('data').setItem(`profile_${body.id}`, session)
})