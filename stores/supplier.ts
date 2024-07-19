import type { Supplier, Row } from '~/interfaces/Supplier.js'

export const useSupplierStore = defineStore("supplier", () => {
    const supplierItems = ref<Row[]>();

    async function get() {
        const { data } = await $api<Supplier>("supplier");

        supplierItems.value = data.value?.rows;
    }

    return {
        supplierItems,
        get
    }
})