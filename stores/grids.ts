import type { Grid, NewColumn } from "~/interfaces/Grid";
import type { CustomFilterGrid } from '~/interfaces/CustomFilter&Grid.js'

export const useGridStore = defineStore("grids", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    const availableGrid = ref<NewColumn[]>([])

    const hiddenGrid = ref<NewColumn[]>([])

    function setData(value: Grid) {
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

        availableGrid.value = available.value
        hiddenGrid.value = hidden.value
    }

    async function updateData() {
        const { model } = useModelStore();

        const { data } = await $api(`custom-filters?model=${model}`)

        const defaultGrid = data.value as CustomFilterGrid
        const mapDefaultGrid = useArrayMap(defaultGrid.rows, ({ label, align, sortable, attribute, width, type }) => ({
            title: label,
            key: attribute,
            maxWidth: width,
            align,
            sortable,
            type,
        }))

        const availableAndHiddenGrid = ref<NewColumn[]>([]);
        availableAndHiddenGrid.value.push(...availableGrid.value, ...hiddenGrid.value)

        const result = useArrayDifference(availableAndHiddenGrid, mapDefaultGrid, (a, b) => a.key === b.key)

        if (result.value.length > 1) {
            for (const res of result.value) {
                if (!useArrayIncludes(availableAndHiddenGrid, res)) {
                    hiddenGrid.value.push(res)
                } else {
                    const availableIndex = useArrayFindIndex(availableGrid, (item) => item.key === res.key)
                    if (availableIndex.value > -1) {
                        availableGrid.value.splice(availableIndex.value, 1)
                        continue
                    }

                    const hiddenIndex = useArrayFindIndex(hiddenGrid, (item) => item.key === res.key)
                    if (hiddenIndex.value > -1) {
                        hiddenGrid.value.splice(hiddenIndex.value, 1)
                        continue
                    }
                }

            }
        }
    }

    function add(index: number, item: NewColumn) {
        availableGrid.value.push(item)
        hiddenGrid.value.splice(index, 1)
    }


    function remove(index: number, item: NewColumn) {
        availableGrid.value.splice(index, 1)
        hiddenGrid.value.push(item)
    }

    return {
        drawer,
        switchDrawer,
        availableGrid,
        hiddenGrid,
        setData,
        updateData,
        add,
        remove
    };
})