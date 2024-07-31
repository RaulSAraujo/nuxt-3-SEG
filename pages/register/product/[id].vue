<script setup lang="ts">
import type { Product } from "~/interfaces/Product.js";

const { params } = useRoute();

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

if (product.value == undefined) {
  const { data, error } = await $api(`product?id=${params.id}`);

  if (!error.value) {
    const val = data.value as Product;

    product.value = val.rows[0];
  }
}

/**
 * Formatação e validação do valor inicial
 */
if (!Number.isInteger(product.value!.weight)) {
  product.value!.weight = Math.ceil(parseFloat(`${product.value!.weight ?? 0.0}`) * 1000);
} else {
  product.value!.weight = product.value!.weight ?? 0;
}

const packageStore = usePackageStore();
await packageStore.get();

const supplierStore = useSupplierStore();
await supplierStore.get();
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para produtos"
        :to="{
          name: 'register-product',
        }"
      />

      <v-spacer />

      <ProductGroupButton />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <NuxtPage :keepalive="true" />
    </v-sheet>

    <ProductFloatingSaveButton />
  </div>
</template>
