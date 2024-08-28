import type { Row } from '~/interfaces/Product.js'

export const useProductStore = defineStore("product", () => {
    const product = ref<Row>();

    const availabilityMap = ref([
        { title: 'DISPONIVEL', value: 1 },
        { title: 'DISPONIVEL(EST)', value: 2 },
        { title: 'INDISPONIVEL COM PREVISÃO', value: 3 },
        { title: 'INDISPONIVEL', value: 4 },
        { title: 'FORA DE LINHA', value: 5 },
        { title: 'BLOQUEADO', value: 6 },
        { title: 'NÃO ENCONTRADO', value: 7 },
    ])

    const productMeasurementsChanged = ref(false)

    const costTableIndex = ref(-1);

    return {
        product,
        costTableIndex,
        availabilityMap,
        productMeasurementsChanged,
    }
})