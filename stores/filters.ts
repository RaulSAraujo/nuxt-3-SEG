import type { CustomFilterGrid } from "~/interfaces/CustomFilterGrid";
import type { Filter, Column, User, ModelAssociation, FilterRow } from "~/interfaces/Filter";

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

    function clearFilterProps() {
        id.value = undefined;
        availableFilter.value = [];
        hiddenFilter.value = [];
    }

    async function loadCustomGrids(model: string) {
        const defaultGrid = await useNuxtApp().$customFetch<CustomFilterGrid>(`custom-filters?model=${model}`)

        const active = useArrayFilter(defaultGrid.rows, (f) => f.active === true)

        const defaultGridWithAssociation = await useNuxtApp().$customFetch<ModelAssociation[]>(`custom-filters/model-association?model=${model}`, {
            method: 'POST',
            body: active.value
        })

        for (const item of defaultGridWithAssociation) {
            if (item.type === 'ARRAY') {
                item.value = [];
                continue
            }

            if (item.type === 'BOOLEAN') {
                item.value = null;
                continue
            }

            if (!item.layout_filters) {
                item.layout_filters = {}
            }

            if (!item.layout_filters.size) {
                item.layout_filters.size = 2
            }

            item.value = ''
        }

        return defaultGridWithAssociation;
    }

    async function reset() {
        const { findModelName } = useModelStore();
        const model = findModelName();

        let defaultGrid: ModelAssociation[] = []
        try {
            defaultGrid = await loadCustomGrids(model);
        } catch (error) {
            const err = error as { statusText: string; message: string };

            return $toast().error(`${err.statusText ?? 'Erro ao resetar os filtros'}`);
        }

        const initial = useArrayFilter(defaultGrid, (f) => f.initial_filter === true)
        const hidden = useArrayFilter(defaultGrid, (f) => f.initial_filter === false)

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
        const { findModelName } = useModelStore();
        const model = findModelName();

        const defaultGrid = await loadCustomGrids(model);

        const availableAndHiddenGrid = ref<Column[]>([]);
        availableAndHiddenGrid.value.push(...availableFilter.value, ...availableFilter.value)

        const result = useArrayDifference(availableAndHiddenGrid, defaultGrid, (a, b) => a.attribute === b.attribute)

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
            const find = useArrayFind(defaultGrid, (f) => f.attribute === item.attribute)

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
        const { findModelName } = useModelStore();
        const model = findModelName();

        dialogImport.value = false;

        if (file && file.name.includes('GRID')) {
            const defaultGrid = await loadCustomGrids(model);

            availableFilter.value = []
            hiddenFilter.value = defaultGrid

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
        const { findModelName } = useModelStore();

        const model = findModelName();

        const dataStr = JSON.stringify(availableFilter.value)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = `database ${model} (GRID).json`
        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    async function create(model: string) {
        const { data } = useAuthState();
        const user = data.value as User;

        const defaultGrid = await loadCustomGrids(model);

        const initial = useArrayFilter(defaultGrid, (f) => f.initial_filter === true)
        const hidden = useArrayFilter(defaultGrid, (f) => f.initial_filter === false)

        const sortedAvailable = useSorted(initial, (a, b) => {
            if (a.sequence_filter == null) return 1;
            if (b.sequence_filter == null) return -1;

            if (a.sequence_filter < b.sequence_filter) return -1;
            if (a.sequence_filter > b.sequence_filter) return 1;
            return 0;
        });

        try {
            const res = await useNuxtApp().$customFetch<FilterRow>(`custom-filters-user`, {
                method: 'POST',
                body: {
                    model,
                    user_id: user.id,
                    available_filters: sortedAvailable.value,
                    hidden_filters: hidden.value
                }
            })

            set({
                rows: [
                    {
                        id: res.id,
                        user_id: res.user_id,
                        model: res.model,
                        available_filters: res.available_filters,
                        hidden_filters: res.hidden_filters,
                        created_at: res.created_at,
                        updated_at: res.updated_at,
                        deleted_at: res.deleted_at,
                        User: res.User
                    }
                ],
                totalRecords: 1,
                resultCount: 1
            })
        } catch (error) {
            const err = error as { statusText: string; data: { error: string } };

            return $toast().error(`${err.data.error ?? err.statusText}`);
        }
    }

    async function save() {
        const { data } = useAuthState();
        const user = data.value as User;

        const { findModelName } = useModelStore();

        const model = findModelName();

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
        clearFilterProps,
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