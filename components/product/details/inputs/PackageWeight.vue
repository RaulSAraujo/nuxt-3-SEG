<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const package_id = computed(() => product.value?.package_id);

const height = computed(() => parseFloat(`${product.value?.height ?? 0}`));
const length = computed(() => parseFloat(`${product.value?.length ?? 0}`));
const width = computed(() => parseFloat(`${product.value?.width ?? 0}`));

const weight_cubic_kg = computed(() => product.value?.Package?.weight_cubic_kg ?? 0);

/**
 * Formatação e validação do valor inicial
 */
product.value!.Package!.package_weight = !Number.isInteger(
  product.value!.Package!.package_weight
)
  ? Math.ceil(parseFloat(`${product.value!.Package!.package_weight ?? 0.0}`) * 1000)
  : product.value!.Package!.package_weight ?? 0;

const FormatFirstPackaging = () => {
  const mult = (height.value * length.value * width.value) / 6000;

  product.value!.Package!.package_weight = Math.ceil(mult * weight_cubic_kg.value * 1000);
};

if (package_id.value === 1) FormatFirstPackaging();

watch(
  () => package_id.value,
  (newValue) => {
    if (!product.value) return;

    if (!product.value.Package) return;

    if (newValue == null) product.value.Package.package_weight = 0;

    if (newValue === 1) return FormatFirstPackaging();

    product.value.Package.package_weight = !Number.isInteger(
      product.value.Package.package_weight
    )
      ? Math.ceil(parseFloat(`${product.value.Package.package_weight ?? 0.0}`) * 1000)
      : product.value.Package.package_weight;
  }
);
</script>

<template>
  <TextField
    v-model="product!.Package!.package_weight"
    label="PESO EMBALAGEM (GRAMAS)"
    :disabled="true"
  />
</template>
