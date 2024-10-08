import type { User } from "~/interfaces/User";
import type { Grid, Column, Row } from "~/interfaces/Grid";
import type { CustomFilterGrid } from '~/interfaces/CustomFilterGrid.js'



export const useGridStore = defineStore("grids", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    const id = ref<number>()

    const availableGrid = ref<Column[]>([])

    const availableFormat = computed(() => [...availableGrid.value])

    const hiddenGrid = ref<Column[]>([])

    const dialogImport = ref<boolean>(false)

    async function get() {
        const { findModelName } = useModelStore();

        const model = findModelName();

        const { data } = useAuth();
        const user = data.value as User;

        let grid: Grid;

        await $api(`grid-configurations?user_id=${user.id}&model=${model}`, {
            priority: "high",
            key: `Grid-${model}`,
            getCachedData(key, nuxtApp) {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            },
        })
            .then(async (res) => {
                if (res.error.value) throw res;

                grid = res.data.value as Grid;

                if (grid.resultCount > 0) {
                    set(grid);
                } else {
                    await create(model);
                }
            })
            .catch((err) => {
                $toast().error(err.error.value.cause ?? err.error.value.message);
            });
    }

    function set(value: Grid) {
        id.value = value.rows[0].id
        availableGrid.value = value.rows[0].available_columns
        hiddenGrid.value = value.rows[0].hidden_columns

        const find = availableGrid.value.find((e) => e.key == 'data-table-expand')
        if (!find) {
            availableGrid.value.splice(0, 0, {
                title: "Expansível",
                align: "",
                sortable: false,
                key: "data-table-expand",
                maxWidth: null,
                type: "expand",
                initial_grid: false,
            });
        }

        const indexFormat = availableFormat.value.findIndex((e) => e.key == 'data-table-expand')
        if (indexFormat > -1) {
            availableFormat.value.splice(indexFormat, 1)
        }
    }

    function clearGridProps() {
        id.value = undefined;
        availableGrid.value = [];
        hiddenGrid.value = [];
    }

    async function loadCustomGrids(model: string) {
        const defaultGrid = await useNuxtApp().$customFetch<CustomFilterGrid>(`custom-filters?model=${model}`)

        defaultGrid.rows = useArrayFilter(defaultGrid.rows, (e) => e.align != ' d-none').value

        return defaultGrid;
    }

    async function reset() {
        const { findModelName } = useModelStore();

        const model = findModelName();

        const defaultGrid = await loadCustomGrids(model);

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

        // Validar se expand esta ativo
        const activeExpand = availableGrid.value.findIndex((e) => e.key == 'data-table-expand') > -1

        if (initial.value.length > 0) {
            const sortedAvailable = useSorted(initial, (a, b) => {
                if (a.sequence_grid == null) return 1;
                if (b.sequence_grid == null) return -1;

                if (a.sequence_grid < b.sequence_grid) return -1;
                if (a.sequence_grid > b.sequence_grid) return 1;
                return 0;
            });

            availableGrid.value = sortedAvailable.value
            hiddenGrid.value = hidden.value

        } else {
            availableGrid.value = hidden.value
            hiddenGrid.value = []
        }

        if (activeExpand) {
            const find = availableGrid.value.find((e) => e.key == 'data-table-expand')
            if (!find) {
                availableGrid.value.splice(0, 0, {
                    title: "Expansível",
                    align: "",
                    sortable: false,
                    key: "data-table-expand",
                    maxWidth: null,
                    type: "expand",
                    initial_grid: false,
                });
            }

            const indexFormat = availableFormat.value.findIndex((e) => e.key == 'data-table-expand')
            if (indexFormat > -1) {
                availableFormat.value.splice(indexFormat, 1)
            }

        }
    }

    async function update() {
        const { findModelName } = useModelStore();

        const model = findModelName();

        const defaultGrid = await loadCustomGrids(model);

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
        const { findModelName } = useModelStore();

        const model = findModelName();

        dialogImport.value = false;

        if (file && file.name.includes('GRID')) {
            const defaultGrid = await loadCustomGrids(model);

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
        const { findModelName } = useModelStore();

        const model = findModelName();

        const dataStr = JSON.stringify(availableGrid.value)
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

        let available_columns: Column[];
        let hidden_columns: Column[];
        if (initial.value.length > 0) {
            const sortedAvailable = useSorted(initial, (a, b) => {
                if (a.sequence_grid == null) return 1;
                if (b.sequence_grid == null) return -1;

                if (a.sequence_grid < b.sequence_grid) return -1;
                if (a.sequence_grid > b.sequence_grid) return 1;
                return 0;
            });

            available_columns = sortedAvailable.value
            hidden_columns = hidden.value

        } else {
            available_columns = hidden.value
            hidden_columns = []
        }


        try {
            const res = await useNuxtApp().$customFetch<Row>(`grid-configurations`, {
                method: 'POST',
                body: {
                    model,
                    user_id: user.id,
                    available_columns: available_columns,
                    hidden_columns: hidden_columns
                }
            })

            set({
                rows: [
                    {
                        id: res.id,
                        user_id: res.user_id,
                        model: res.model,
                        available_columns: res.available_columns,
                        hidden_columns: res.hidden_columns,
                        created_at: res.created_at,
                        updated_at: res.updated_at,
                        deleted_at: res.deleted_at
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
        availableFormat,
        hiddenGrid,
        clearGridProps,
        get,
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