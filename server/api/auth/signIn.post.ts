import { Operation } from "~/interfaces/Operation"
import { Page } from "~/interfaces/Page"

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

const auth_pages = (pages: Page[]) => {
    const filter = pages.filter((item) => item.title !== 'Options')
    const auth_pages = filter.map((menu) => {
        return {
            ...menu,
            items: menu.items.filter((item) => item.auth && !item.child),
        }
    })

    useStorage('data').setItem('auth_pages', auth_pages)
}

const auth_pages_options = (pages: Page[]) => {
    const filter = pages.filter((item) => item.title === 'Options')

    const auth_pages_options = filter.map((menu) => menu.items.filter((item) => item.auth && !item.child))[0]

    useStorage('data').setItem('auth_pages_options', auth_pages_options)
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

        const operations = response.operations as Operation[]
        const pages = await useStorage('assets:server').getItem(`pages.json`) as Page[]
        for (const operation of operations) {
            if (operation.name === "Ver") {
                pages.forEach(menu => {
                    const findMenu = menu.items.find(subMenu => operation.back_url === subMenu.backUrl)
                    if (findMenu) findMenu.auth = true
                })
            }
        }

        auth_pages(pages);
        auth_pages_options(pages);

        // useStorage('data').setItem('pages', pages)

        return response
    } catch (err) {
        console.error('Error fetching login data:', err)
        return null
    }
})