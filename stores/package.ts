import type { AsyncDataRequestStatus } from "#app";
import type { Package, Row } from "~/interfaces/Package.js";

export const usePackageStore = defineStore("package", () => {
    const packageItems = ref<Row[]>();
    const status = ref<AsyncDataRequestStatus>();

    function get() {
        const { data, status: st } = $api<Package>("package", {
            key: 'PackageList',
            pick: ['rows'],
            lazy: true,
            getCachedData(key, nuxtApp) {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
            }
        });

        status.value = st.value;
        packageItems.value = data.value?.rows;
    }

    return {
        packageItems,
        status,
        get,
    }
})