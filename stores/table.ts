export const useTableStore = defineStore("table", () => {

    const url = ref<string>('')
    const items = ref<object[]>([]);
    const totalItems = ref(0);
    const loading = ref(false);
    const page = ref(1);
    const itemsPerPage = ref(10);
    const itemsPerPageoptions = ref([
        { value: 10, title: "10" },
        { value: 25, title: "25" },
        { value: 50, title: "50" },
        { value: 100, title: "100" },
    ]);
    const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

    const filterStore = useFilterStore()
    const { availableFilter } = storeToRefs(filterStore)

    async function searchData() {
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

        loading.value = true;

        useNuxtApp().$customFetch(url.value, {
            method: "GET",
            params: {
                page: page.value,
                perPage: itemsPerPage.value,
                ...params,
            },
            priority: "low",
        }).then(async (res) => {
            const data = res as { resultCount: number; rows: object[]; totalRecords: number };

            items.value = data.rows;
            totalItems.value = data.totalRecords;
        })
            .catch((error) => {
                $toast().error(`${error.cause.message ?? error.message}`);
            })
            .finally(() => {
                loading.value = false;
            });

    };

    return { url, items, totalItems, loading, page, itemsPerPage, itemsPerPageoptions, pageCount, searchData };
})