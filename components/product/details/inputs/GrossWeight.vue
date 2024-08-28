<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const package_id = computed(() => product.value?.package_id);

const weight = computed(() => parseFloat(`${product.value?.weight ?? 0}`));
const package_weight = computed(() => product.value?.Package?.package_weight ?? 0);

/**
 * Formatação e validação do valor inicial
 */
product.value!.gross_weight = weight.value + package_weight.value;

if (package_id.value == null) product.value!.gross_weight = 0;

watch(
  () => [package_id.value, weight.value],
  (newValue) => {
    if (!product.value) return;

    if (newValue == null) {
      product.value.gross_weight = 0;
    }

    product.value.gross_weight = package_weight.value + weight.value;
  }
);
</script>

<template>
  <TextField v-model="product!.gross_weight" label="Peso bruto (g)" :disabled="true" />
</template>
