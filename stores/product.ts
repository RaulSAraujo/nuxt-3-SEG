import type { Row } from '~/interfaces/Product.js'

export const useProductStore = defineStore("product", () => {
    const product = ref<Row>();

    const availabilityMap = ref([
        { title: 'Disponivel', value: 1 },
        { title: 'Disponivel(est)', value: 2 },
        { title: 'Indisponivel com previsão', value: 3 },
        { title: 'Indisponivel', value: 4 },
        { title: 'Fora de linha', value: 5 },
        { title: 'Bloqueado', value: 6 },
        { title: 'Não encontrado', value: 7 },
    ])
    
    const productMeasurementsChanged = ref(false)

    const costTableIndex = ref(-1);

    return {
        product,
        costTableIndex,
        availabilityMap,
        productMeasurementsChanged
    }
})