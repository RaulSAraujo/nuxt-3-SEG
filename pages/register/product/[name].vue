<script setup lang="ts">
import type { Product } from "~/interfaces/Product.js";

const { params } = useRoute();

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

if (product.value == undefined) {
  const { data, error } = await $api(`product?name=${params.name}&unique=true`);

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
  <v-main class="mt-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :to="{
          name: 'register-product',
        }"
      >
        Voltar para produtos
      </v-btn>

      <v-spacer />

      <ProductGroupBtn />
    </div>

    <v-sheet class="mx-2" rounded="t-xl" elevation="5">
      <NuxtPage />
    </v-sheet>

    <ProductFloatingSaveBtn />
  </v-main>
</template>
