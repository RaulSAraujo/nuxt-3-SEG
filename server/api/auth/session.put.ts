import type { User } from '~/interfaces/User';
import type { H3Event } from 'h3';
import { eventHandler } from 'h3';

export default eventHandler(async (event: H3Event) => {
    const session = await useStorage().getItem('data:session') as User
    if (!session) return

    const body = await readBody(event)

    session.theme = body.theme as boolean

    useStorage('data').setItem('session', session)
})