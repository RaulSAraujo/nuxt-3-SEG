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

const { payload } = useNuxtApp();

const packageItems = payload.data["PackageList"] as Row[];

const packageSelect = ref<number | "Personalizada">(
  product.value?.package_id ?? "Personalizada"
);

if (product.value && packageSelect.value === "Personalizada") {
  const find = useArrayFind(packageItems, (e) => e.name === "Personalizada");

  product.value.Package = find.value as Row;
}
</script>

<template>
  <Select
    v-model="packageSelect"
    label="Embalagem"
    :items="packageItems ?? []"
    item-title="name"
    item-value="id"
    :multiple="false"
    :return-object="true"
    @update:model-value="setPackage"
  />
</template>
