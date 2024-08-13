import type { Supplier, Row } from '~/interfaces/Supplier.js'

export const useSupplierStore = defineStore("supplier", () => {
    const supplierItems = ref<Row[]>();

    function get() {
        const { data, status } = $api<Supplier>("supplier", {
            key: 'SupplierList',
            pick: ['rows'],
            lazy: true,
            getCachedData(key, nuxtApp) {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
            }
        });

        supplierItems.value = data.value?.rows;

        return status
    }

    return {
        supplierItems,
        get
    }
})