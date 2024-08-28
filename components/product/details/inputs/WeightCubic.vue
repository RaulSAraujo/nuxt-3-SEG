<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const package_id = computed(() => product.value?.package_id);

const height = computed(() => parseFloat(`${product.value?.height || 0}`));
const width = computed(() => parseFloat(`${product.value?.width || 0}`));
const length = computed(() => parseFloat(`${product.value?.length || 0}`));

const mult = (height.value * width.value * length.value) / 6000;

product.value!.weight_cubic = Math.ceil(parseFloat(`${mult * 1000}`));

watch(
  () => [package_id.value, height.value, width.value, length.value],
  () => {
    const mult = (height.value * width.value * length.value) / 6000;

    product.value!.weight_cubic = Math.ceil(parseFloat(`${mult * 1000}`));
  }
);
</script>

<template>
  <TextField v-model="product!.weight_cubic" label="Peso cubico (g)" disabled />
</template>
