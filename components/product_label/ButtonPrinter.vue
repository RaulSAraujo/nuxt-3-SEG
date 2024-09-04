<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

const items = useState<Row[]>("items-creation-label", () => []);

const printer = async () => {
  const newArray = items.value.map((e) => {
    if (e.name?.search("#") === -1) {
      return {
        name: e.name,
        produto_chave: e.produto_chave,
        amount: e.quantity,
      };
    } else {
      return {
        erp_product_id: e.erp_product_id,
        amount: e.quantity,
      };
    }
  });

  await useNuxtApp().$customFetch("stock-tag-control", {
    method: "POST",
    body: newArray,
  });

  items.value = [];

  $toast().success("Etiquetas geradas com sucesso");
};
</script>

<template>
  <v-fab
    :color="items.length == 0 ? 'grey' : 'primary'"
    icon="mdi-printer"
    class="mb-4"
    location="bottom end"
    size="60"
    app
    appear
    :disabled="items.length == 0"
    @click="printer"
  />
</template>
