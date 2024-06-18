import type { UseFetchOptions } from "#app";

export function $api<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$customFetch,
    })
}