import { useArrayFilter, useArrayMap } from "@vueuse/core"
import type { Operation } from "~/interfaces/Operation"
import type { Page } from "~/interfaces/Page"
import type { H3Event } from 'h3'

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

const auth_pages = async (pages: Page[]) => {
    const auth_pages = await useArrayMap(pages, (menu) => {
        const items = menu.items.filter((item) => item.auth && !item.child)

        if (items.length > 0) {
            return {
                ...menu,
                items: menu.items.filter((item) => item.auth && !item.child),
            }

        } else {
            return null
        }
    })

    const removeNull = useArrayFilter(auth_pages, (f) => f != null)

    return removeNull;
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
    const { username, password } = await readBody(event)

    const baseUrl = getBaseUrl(event)

    const response = await $fetch<SignIn>(`${baseUrl}/login`, {
        method: 'POST',
        body: {
            username,
            password
        },
    })

    const operations = response.operations as Operation[]
    const pages = await useStorage('assets:server').getItem(`pages.json`) as Page[]
    for (const operation of operations) {
        if (operation.name === "Ver") {
            for (const page of pages) {
                const findMenu = page.items.find(subMenu => operation.back_url === subMenu.backUrl)

                if (findMenu) {
                    findMenu.auth = true
                }
            }
        }
    }

    const AuthenticatedPages = await auth_pages(pages);

    const filterMenu = useArrayFilter(AuthenticatedPages, (f) => f!.title !== 'Options')

    await useStorage('data').setItem(`group_id_${response.group_id}:pages`, filterMenu.value)

    const filterOptions = useArrayFilter(AuthenticatedPages, (f) => f!.title === 'Options')

    await useStorage('data').setItem(`group_id_${response.group_id}:pages_options`, filterOptions.value[0])

    return response
})