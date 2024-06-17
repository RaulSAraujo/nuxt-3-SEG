import type { AsyncData, UseFetchOptions } from "#app";

const { token } = useAuth();

const config = useRuntimeConfig();

export const $api = () => {
    const baseURL = config.public.base_url_external; // Cache base URL for efficiency

    const fetchWithAuth = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', opts: UseFetchOptions<Object>) => {
        try {
            const response = await useFetch(url, {
                baseURL,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token.value}`, // Use Bearer token format
                },
                method,
                ...opts,
            });

            return response as AsyncData<Object, Object>;
        } catch (error) {
            console.error('API request error:', error); // More informative error message
        }
    };

    return {
        get: async (url: string, opts: UseFetchOptions<Object>) => fetchWithAuth(url, 'GET', opts),
        post: async (url: string, opts: UseFetchOptions<Object>) => fetchWithAuth(url, 'POST', opts),
        put: async (url: string, opts: UseFetchOptions<Object>) => fetchWithAuth(url, 'PUT', opts),
        del: async (url: string, opts: UseFetchOptions<Object>) => fetchWithAuth(url, 'DELETE', opts),
    };
};