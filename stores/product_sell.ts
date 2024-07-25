import type { Row } from '~/interfaces/ProductSell.js'

export const useProductSellStore = defineStore("product_sell", () => {
    const product = ref<Row>();


    return {
        product
    }
})
