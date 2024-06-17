export const $api = () => {
    const app = useNuxtApp();

    const get = async (url: string, params: Record<string, any> = {}) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await app.$GET(`${url}?${queryString}`);

            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    };

    const post = async (url: string, data: Object | Array<string>) => {
        try {
            const response = await app.$POST(`${url}`, {
                body: JSON.stringify(data),
            });

            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    };

    const put = async (url: string, data: Object | Array<string>) => {
        try {
            const response = await app.$PUT(`${url}`, {
                body: JSON.stringify(data),
            });

            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    };

    const del = async (url: string) => {
        try {
            const response = await app.$DELETE(`${url}`);

            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    };

    const handleResponse = async (response: any) => {
        return response;
    };

    const handleError = (error: any) => {
        console.error(error);
    };

    return {
        get,
        post,
        put,
        del,
    };
};
