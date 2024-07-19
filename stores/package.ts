import type { Package, Row } from "~/interfaces/Package.js";

export const usePackageStore = defineStore("package", () => {
    const packageItems = ref<Row[]>();

    async function get() {
        const { data } = await $api<Package>("package");

        packageItems.value = data.value?.rows;
    }

    return {
        packageItems,
        get
    }
})