import type { Page } from "~/interfaces/Page";

export const usePageStore = defineStore('pages', async () => {
    const pagesStore = ref<Page[]>([])

    const auth_pages = computed<Page[]>(() => {
        const filter = pagesStore.value.filter((item) => item.title !== 'Options')

        return filter.map((menu) => {
            return {
                ...menu,
                items: menu.items.filter((item) => item.auth && !item.child),
            }
        })
    })

    const auth_pages_options = computed(() => {
        const filter = pagesStore.value.filter((item) => item.title === 'Options')

        return filter.map((menu) => menu.items.filter((item) => item.auth && !item.child))[0]
    })

    return { pagesStore, auth_pages, auth_pages_options }
})