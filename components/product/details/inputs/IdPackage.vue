<script setup lang="ts">
import type { Row } from "~/interfaces/Package.js";

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const setPackage = (packageData: Row) => {
  if (!product.value) return;

  product.value.package_id = packageData.id;

  product.value.Package = packageData;

  product.value.height = parseFloat(`${packageData.height ?? 0}`).toFixed(2);
  product.value.width = parseFloat(`${packageData.width ?? 0}`).toFixed(2);
  product.value.length = parseFloat(`${packageData.length ?? 0}`).toFixed(2);
};

const packageStore = usePackageStore();
const { packageItems } = storeToRefs(packageStore);

const packageSelect = ref<number>(product.value?.package_id ?? 1);

if (product.value && packageItems.value && packageSelect.value === 1) {
  const find = useArrayFind(packageItems.value, (e) => e.name === "Personalizada");

  product.value.Package = find.value as Row;
}
</script>

<template>
  <Select
    v-model="packageSelect"
    label="EMBALAGEM"
    :items="packageItems ?? []"
    item-title="name"
    item-value="id"
    :multiple="false"
    :return-object="true"
    @update:model-value="setPackage"
  />
</template>
