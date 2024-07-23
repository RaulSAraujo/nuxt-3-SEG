import type { Grid, Column } from "~/interfaces/Grid";
import type { CustomFilterGrid } from '~/interfaces/CustomFilterGrid.js'
import type { User } from "~/interfaces/User";

export const useGridStore = defineStore("grids", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    const id = ref<number>()

    const availableGrid = ref<Column[]>([])

    const hiddenGrid = ref<Column[]>([])

    const dialogImport = ref<boolean>(false)

    function set(value: Grid) {
        id.value = value.rows[0].id
        availableGrid.value = value.rows[0].available_columns
        hiddenGrid.value = value.rows[0].hidden_columns
    }

    function clearGridProps() {
        id.value = undefined;
        availableGrid.value = [];
        hiddenGrid.value = [];
    }

    async function loadCustomGrids() {
        const { model } = useModelStore();

        const defaultGrid = await useNuxtApp().$customFetch<CustomFilterGrid>(`custom-filters?model=${model}`)

        return defaultGrid;
    }

    async function reset() {
        const defaultGrid = await loadCustomGrids();

        const mapDefaultGrid = useArrayMap(defaultGrid.rows, ({ label, align, sortable, attribute, width, type, initial_grid, sequence_grid }) => ({
            title: label,
            key: attribute,
            maxWidth: width,
            align,
            sortable,
            type,
            initial_grid,
            sequence_grid
        }))

        const initial = useArrayFilter(mapDefaultGrid, (f) => f.initial_grid === true)
        const hidden = useArrayFilter(mapDefaultGrid, (f) => f.initial_grid === false)

        const sortedAvailable = useSorted(initial, (a, b) => {
            if (a.sequence_grid == null) return 1;
            if (b.sequence_grid == null) return -1;

            if (a.sequence_grid < b.sequence_grid) return -1;
            if (a.sequence_grid > b.sequence_grid) return 1;
            return 0;
        });

        availableGrid.value = sortedAvailable.value
        hiddenGrid.value = hidden.value
    }

    async function update() {
        const defaultGrid = await loadCustomGrids();

        const mapDefaultGrid = useArrayMap(defaultGrid.rows, ({ label, align, sortable, attribute, width, type, initial_grid, sequence_grid }) => ({
            title: label,
            key: attribute,
            maxWidth: width,
            align,
            sortable,
            type,
            initial_grid,
            sequence_grid
        }))

        const availableAndHiddenGrid = ref<Column[]>([]);
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

        for (const item of availableGrid.value) {
            const find = useArrayFind(mapDefaultGrid, (f) => f.key === item.key)

            if (find.value) {
                item.title = find.value.title;
                item.align = find.value.align;
                item.sortable = find.value.sortable;
                item.type = find.value.type;
                item.maxWidth = find.value.maxWidth;
            }
        }
    }

    async function importGrid(file: File | undefined) {
        dialogImport.value = false;

        if (file && file.name.includes('GRID')) {
            const defaultGrid = await loadCustomGrids();

            const mapDefaultGrid = useArrayMap(defaultGrid.rows, ({ label, align, sortable, attribute, width, type, initial_grid, sequence_grid }) => ({
                title: label,
                key: attribute,
                maxWidth: width,
                align,
                sortable,
                type,
                initial_grid,
                sequence_grid
            }))

            availableGrid.value = []
            hiddenGrid.value = mapDefaultGrid.value

            const reader = new FileReader()
            await reader.readAsText(file)
            reader.onload = () => {
                const result = JSON.parse(`${reader.result}`) as Column[]

                for (const item of result) {
                    const index = hiddenGrid.value.findIndex((grid) => {
                        return item.key === grid.key
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

        const dataStr = JSON.stringify(availableGrid.value)
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

        const mapDefaultGrid = useArrayMap(defaultGrid.rows, ({ label, align, sortable, attribute, width, type, initial_grid, sequence_grid }) => ({
            title: label,
            key: attribute,
            maxWidth: width,
            align,
            sortable,
            type,
            initial_grid,
            sequence_grid
        }))

        const initial = useArrayFilter(mapDefaultGrid, (f) => f.initial_grid === true)
        const hidden = useArrayFilter(mapDefaultGrid, (f) => f.initial_grid === false)

        const sortedAvailable = useSorted(initial, (a, b) => {
            if (a.sequence_grid == null) return 1;
            if (b.sequence_grid == null) return -1;

            if (a.sequence_grid < b.sequence_grid) return -1;
            if (a.sequence_grid > b.sequence_grid) return 1;
            return 0;
        });

        try {
            const res = await useNuxtApp().$customFetch<Grid>(`grid-configurations`, {
                method: 'POST',
                body: {
                    model,
                    user_id: user.id,
                    available_columns: sortedAvailable.value,
                    hidden_columns: hidden.value
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
            await useNuxtApp().$customFetch(`grid-configurations`, {
                method: 'PUT',
                body: {
                    id: id.value,
                    model,
                    user_id: user.id,
                    available_columns: availableGrid.value,
                    hidden_columns: hiddenGrid.value
                }
            })

            $toast().success('Sucesso em salvar as configurações.');
        } catch (error) {
            const err = error as { statusText: string; message: string };

            return $toast().error(`${err.statusText ?? err.message}`);
        }
    }

    function add(index: number, item: Column) {
        availableGrid.value.push(item)
        hiddenGrid.value.splice(index, 1)
    }

    function remove(index: number, item: Column) {
        availableGrid.value.splice(index, 1)
        hiddenGrid.value.push(item)
    }

    return {
        drawer,
        switchDrawer,
        availableGrid,
        hiddenGrid,
        clearGridProps,
        set,
        reset,
        create,
        update,
        save,
        dialogImport,
        importGrid,
        exportGrid,
        add,
        remove
    };
})