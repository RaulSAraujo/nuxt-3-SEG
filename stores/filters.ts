import type { FilterData } from "~/interfaces/Filter";

export const useFilterStore = defineStore("filters", () => {
    const drawer = ref<boolean>(false)

    function switchDrawer() {
        drawer.value = !drawer.value
    }

    interface Filter {
        association_data: {
            rows: []
        },
        attribute: string,
        initial_filter: boolean,
        item_name: string,
        item_value: string,
        label: string,
        length: number,
        layout_filters: {
            approximate: boolean | undefined,
            placeHolder: boolean | undefined,
            size: number | undefined,
            clearable: boolean | undefined,
            multiple: boolean | undefined,
            comboBox: boolean | undefined,
            range: boolean | undefined,
            checkBox: boolean | undefined,
            lock: boolean | undefined,
        },
        type: string,
        value: string | [] | number | boolean | null | undefined
    }

    const availableFilter = ref<Filter[]>([])

    const hiddenFilter = ref<Filter[]>([])

    function setData(value: FilterData) {
        availableFilter.value = value.rows[0].available_filters
        hiddenFilter.value = value.rows[0].hidden_filters
    }

    async function searchData(options: { page: number, itemsPerPage: number, sortBy: never[] }, url: string) {
        if (import.meta.server) return;

        type AccValue = string | number | boolean | null | undefined | AccValue[];
        const validateValue = (value: AccValue) => {
            if (value === null || value === undefined) {
                return false;
            }

            if (typeof value === "string" && value.trim() === "") {
                return false;
            }

            return true;
        };

        const params = availableFilter.value.reduce(
            (acc: Record<string, AccValue>, { attribute, value }) => {
                if (validateValue(value)) {
                    acc[attribute] = value;
                }

                return acc;
            },
            {}
        );

        return useNuxtApp().$customFetch(url, {
            method: "GET",
            params: {
                page: options.page,
                perPage: options.itemsPerPage,
                ...params,
            },
            priority: "low",
        })
    };


    return { drawer, switchDrawer, availableFilter, hiddenFilter, setData, searchData };
})