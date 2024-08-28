<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product.js";

const tableStore = useTableStore();
const { items, selected } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const integrationSegEcom = async () => {
  loading.start();

  let stringErp = "";
  if (selected.value.length !== 0) {
    stringErp = (selected.value as Row[]).map((item) => item.erp_product_id).join(",");

    $toast().info("Integração ECOM > SEG dos produtos selecionados em andamento");
  } else {
    if (items.value.length === 0) return;

    stringErp = (items.value as Row[]).map((item) => item.erp_product_id).join(",");

    $toast().info("Integração ECOM > SEG dos produtos da pagina em andamento");
  }

  const { rows } = await useNuxtApp().$customFetch<Product>(
    `seg-ecom?erp_product_id=${stringErp}`
  );

  for (let i = 0; i < rows.length; i++) {
    await useNuxtApp().$customFetch("seg-ecom", {
      method: "PUT",
      body: {
        id: rows[i].id,
        updated: false,
      },
    });
  }

  loading.finish();
};
</script>

<template>
  <v-tooltip
    location="top"
    text="INTEGRAÇÃO SEG > ECOM"
    style="
      --v-theme-surface-variant: 0, 150, 136;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-database-sync-outline"
        style="color: rgb(0, 150, 136)"
        @click="integrationSegEcom"
      />
    </template>
  </v-tooltip>
</template>
