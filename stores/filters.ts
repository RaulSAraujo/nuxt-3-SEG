import type { Filter, AvailableFilter, HiddenFilter } from "~/interfaces/Filter";

export const useFilterStore = defineStore("filters", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    const availableFilter = ref<AvailableFilter[]>([])

    const hiddenFilter = ref<HiddenFilter[]>([])

    function setData(value: Filter) {
        availableFilter.value = value.rows[0].available_filters
        hiddenFilter.value = value.rows[0].hidden_filters
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

    return { drawer, switchDrawer, availableFilter, hiddenFilter, setData, clearValues };
})