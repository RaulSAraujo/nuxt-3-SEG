import type { GridData } from "~/interfaces/Grid";

export const useFilterStore = defineStore("filters", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    const availableFilter = ref<{
        title: string;
        align: string;
        sortable: boolean;
        key: string;
        maxWidth: string | number | null;
        type: string;
    }[]>([])

    const hiddenFilter = ref<{
        title: string;
        align: string;
        sortable: boolean;
        key: string;
        maxWidth: string | number | null;
        type: string;
    }[]>([])

    function setData(value: GridData) {
        const sortedAvailable = useSorted(value.rows[0].available_columns, (a, b) => {
            if (a.sequence_grid == null) return 1;
            if (b.sequence_grid == null) return -1;

            if (a.sequence_grid < b.sequence_grid) return -1;
            if (a.sequence_grid > b.sequence_grid) return 1;
            return 0;
        });

        const available = useArrayMap(sortedAvailable, ({ text, align, sortable, value, width, type }) => ({
            title: text,
            key: value,
            maxWidth: width,
            align,
            sortable,
            type,
        }))

        const hidden = useArrayMap(value.rows[0].hidden_columns, ({ text, align, sortable, value, width, type }) => ({
            title: text,
            key: value,
            maxWidth: width,
            align,
            sortable,
            type,
        }))

        availableFilter.value = available.value
        hiddenFilter.value = hidden.value
    }


    return { drawer, switchDrawer, availableFilter, hiddenFilter, setData };
})