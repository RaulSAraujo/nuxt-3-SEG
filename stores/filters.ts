import type { Filter, Column, User } from "~/interfaces/Filter";
import type { CustomFilterGrid } from "~/interfaces/CustomFilter&Grid";

export const useFilterStore = defineStore("filters", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    const id = ref<number>()

    const availableFilter = ref<Column[]>([])

    const hiddenFilter = ref<Column[]>([])

    const dialogImport = ref<boolean>(false)

    function set(value: Filter) {
        id.value = value.rows[0].id
        availableFilter.value = value.rows[0].available_filters
        hiddenFilter.value = value.rows[0].hidden_filters
    }

    async function loadCustomGrids() {
        const { model } = useModelStore();

        const defaultGrid = await useNuxtApp().$customFetch<CustomFilterGrid>(`custom-filters?model=${model}`)

        return defaultGrid;
    }

    async function reset() {
        const defaultGrid = await loadCustomGrids();

        const initial = useArrayFilter(defaultGrid.rows, (f) => f.initial_filter === true)
        const hidden = useArrayFilter(defaultGrid.rows, (f) => f.initial_filter === false)

        const sortedAvailable = useSorted(initial, (a, b) => {
            if (a.sequence_filter == null) return 1;
            if (b.sequence_filter == null) return -1;

            if (a.sequence_filter < b.sequence_filter) return -1;
            if (a.sequence_filter > b.sequence_filter) return 1;
            return 0;
        });

        availableFilter.value = sortedAvailable.value
        hiddenFilter.value = hidden.value
    }

    async function update() {
        const defaultGrid = await loadCustomGrids();

        const availableAndHiddenGrid = ref<Column[]>([]);
        availableAndHiddenGrid.value.push(...availableFilter.value, ...availableFilter.value)

        const result = useArrayDifference(availableAndHiddenGrid, defaultGrid.rows, (a, b) => a.attribute === b.attribute)

        if (result.value.length > 1) {
            for (const res of result.value) {
                if (!useArrayIncludes(availableAndHiddenGrid, res)) {
                    hiddenFilter.value.push(res)
                } else {
                    const availableIndex = useArrayFindIndex(availableFilter, (item) => item.attribute === res.attribute)
                    if (availableIndex.value > -1) {
                        availableFilter.value.splice(availableIndex.value, 1)
                        continue
                    }

                    const hiddenIndex = useArrayFindIndex(hiddenFilter, (item) => item.attribute === res.attribute)
                    if (hiddenIndex.value > -1) {
                        hiddenFilter.value.splice(hiddenIndex.value, 1)
                        continue
                    }
                }

            }
        }

        for (const item of availableFilter.value) {
            const find = useArrayFind(defaultGrid.rows, (f) => f.attribute === item.attribute)

            if (find.value) {
                item.label = find.value.label;
                item.initial_filter = find.value.initial_filter;
                item.item_name = find.value.item_name;
                item.item_value = find.value.item_value;
                item.layout_filters = find.value.layout_filters;
                item.length = find.value.length;
            }
        }
    }

    async function importGrid(file: File | undefined) {
        dialogImport.value = false;

        if (file && file.name.includes('GRID')) {
            const defaultGrid = await loadCustomGrids();

            availableFilter.value = []
            hiddenFilter.value = defaultGrid.rows

            const reader = new FileReader()
            await reader.readAsText(file)
            reader.onload = () => {
                const result = JSON.parse(`${reader.result}`) as Column[]

                for (const item of result) {
                    const index = hiddenFilter.value.findIndex((grid) => {
                        return item.attribute === grid.attribute
                    })

                    if (index > -1) {
                        add(index, item)
                    }
                }

                $toast().success('Importação concluida')
            }
        } else {
            $toast().error('Importação invalida.')
        }
    }

    async function exportGrid() {
        const { model } = useModelStore();

        const dataStr = JSON.stringify(availableFilter.value)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = `database ${model} (GRID).json`
        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    async function create() {
        const { data } = useAuthState();
        const user = data.value as User;

        const { model } = useModelStore();

        const defaultGrid = await loadCustomGrids();

        const initial = useArrayFilter(defaultGrid.rows, (f) => f.initial_filter === true)
        const hidden = useArrayFilter(defaultGrid.rows, (f) => f.initial_filter === false)

        const sortedAvailable = useSorted(initial, (a, b) => {
            if (a.sequence_filter == null) return 1;
            if (b.sequence_filter == null) return -1;

            if (a.sequence_filter < b.sequence_filter) return -1;
            if (a.sequence_filter > b.sequence_filter) return 1;
            return 0;
        });

        try {
            const res = await useNuxtApp().$customFetch<Filter>(`custom-filters-user`, {
                method: 'POST',
                body: {
                    model,
                    user_id: user.id,
                    available_filters: sortedAvailable.value,
                    hidden_filters: hidden.value
                }
            })

            set(res)
        } catch (error) {
            const err = error as { statusText: string; message: string };

            return $toast().error(`${err.statusText ?? err.message}`);
        }
    }

    async function save() {
        const { data } = useAuthState();
        const user = data.value as User;

        const { model } = useModelStore();

        try {
            await useNuxtApp().$customFetch(`custom-filters-user`, {
                method: 'PUT',
                body: {
                    id: id.value,
                    model,
                    user_id: user.id,
                    available_filters: availableFilter.value,
                    hidden_filters: hiddenFilter.value
                }
            })

            $toast().success('Sucesso em salvar as configurações.');
        } catch (error) {
            const err = error as { statusText: string; message: string };

            return $toast().error(`${err.statusText ?? err.message}`);
        }
    }

    function add(index: number, item: Column) {
        availableFilter.value.push(item)
        hiddenFilter.value.splice(index, 1)
    }

    function remove(index: number, item: Column) {
        availableFilter.value.splice(index, 1)
        hiddenFilter.value.push(item)
    }

    function clearValues() {
        for (const item of availableFilter.value) {
            if (item.type === 'ARRAY') {
                item.value = [];
                continue
            }

            if (item.type === 'BOOLEAN') {
                item.value = null;
                continue
            }

            item.value = ''
        }
    }

    const activeCreateButton = ref<boolean>(false)
    const changeValuesFilter = ref<boolean>(false)

    return {
        drawer,
        switchDrawer,
        availableFilter,
        hiddenFilter,
        set,
        reset,
        create,
        update,
        save,
        clearValues,
        dialogImport,
        importGrid,
        exportGrid,
        activeCreateButton,
        add,
        remove,
        changeValuesFilter
    };
})