<script setup lang="ts">
import type { ProductSell, Row } from "~/interfaces/ProductSell.js";

const { params } = useRoute();

const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);

if (product.value == undefined) {
  const { data, status } = await $api<Partial<Row>>(`product-sell`, {
    key: `ProductSell`,
    query: {
      id: params.id,
    },
    transform: (fetchData) => {
      const row = (fetchData as ProductSell).rows[0];

      return {
        id: row.id,
        type_id: row.type_id,
        type: row.type,
        quantity: row.quantity,
        ean_gs1: row.ean_gs1,
        active: row.active,
        description: row.description,
        created_at: row.created_at,
        updated_at: row.updated_at,
        model: row.model,
        syncecom: row.syncecom,
        syncedecom: row.syncedecom,
        syncecominprogress: row.syncecominprogress,
        syncecomfailed: row.syncecomfailed,
        image: row.image,
        sync_comclick: row.sync_comclick,
        sync_loja_do_tecnico: row.sync_loja_do_tecnico,
        sync_viziotech: row.sync_viziotech,
      };
    },
  });

  if (status.value === "success") {
    product.value = data.value!;
  }
}
</script>

<template>
  <div class="my-5 mx-2">
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
      <ClientOnly>
        <NuxtPage :keepalive="true" />

        <template #fallback>
          <v-container :fluid="true">
            <v-skeleton-loader type="article,image,article" />
          </v-container>
        </template>
      </ClientOnly>
    </v-sheet>

    <ProductSellFloatingSaveButton />
  </div>
</template>
