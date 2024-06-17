export default defineEventHandler(async (event) => {
    try {
        const authHeaderValue = getRequestHeader(event, 'authorization')
        const response = await $fetch(`${useRuntimeConfig().public.base_url_external}/login/refresh`, {
            method: 'POST',
            body: JSON.stringify({
                jwt: authHeaderValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response
    } catch (err) {
        console.error('Error fetching login data:', err)
        return null
    }
})