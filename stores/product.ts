import type { Row } from '~/interfaces/Product.js'
import type { Family as FamilyProduct, Product } from "~/interfaces/Family.js";
import type { Kit, Family as FamilyKit } from "~/interfaces/Kit.js";

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

    const family = ref<Product[] | null>();

    const kit = ref<FamilyKit[] | null>();

    function getFamilyKit(type: string, type_id: string) {
        const { data, status } = $api<FamilyProduct | Kit>(`${type}`, {
            key: 'FamilyOrKitProduct',
            query: { id: type_id },
            pick: ['rows']
        });

        const productStore = useProductStore();
        const { family, kit } = storeToRefs(productStore);

        if (data != null && type == "family") {
            const format = data.value as FamilyProduct;

            family.value = format?.rows[0].Products ?? null;
        } else {
            const format = data.value as Kit;

            kit.value = format?.rows[0].Families;
        }

        return status
    }

    return {
        product,
        costTableIndex,
        availabilityMap,
        productMeasurementsChanged,
        family,
        kit,
        getFamilyKit
    }
})