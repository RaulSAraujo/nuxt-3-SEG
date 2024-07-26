<script setup lang="ts">
import type { ProductSell } from "~/interfaces/ProductSell.js";

const { params } = useRoute();

const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);

if (product.value == undefined) {
  const { data, error } = await $api<ProductSell>(`product-sell?id=${params.id}`);

  if (!error.value) {
    product.value = data.value!.rows[0];
  }
}
</script>

<template>
  <v-main class="mt-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para produto venda"
        :to="{
          name: 'register-product-sell',
        }"
      />

      <v-spacer />

      <ProductSellGroupButton />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <NuxtPage :keepalive="true" />
    </v-sheet>

    <ProductSellFloatingSaveButton />
  </v-main>
</template>
