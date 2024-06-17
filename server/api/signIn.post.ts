interface SignIn {
    group_id: number,
    is_admin: boolean,
    jwt: string,
    operations: {
        back_url: string,
        created_at: Date | null,
        deleted_at: Date | null,
        description: string,
        front_url: string,
        id: number,
        model: string,
        name: string,
        resource: string,
        updated_at: string
    }[],
    redirect: string,
    success: boolean
}

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    try {
        const response = await $fetch(`${useRuntimeConfig().public.base_url_external}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }) as SignIn

        useStorage('data').setItem('operations', response.operations)

        return response
    } catch (err) {
        console.error('Error fetching login data:', err)
        return null
    }
})