<script setup lang="ts">
import type { StockMovementHistory } from "~/interfaces/StockMovementHistory.js";

useHead({
  titleTemplate: `Historico de movimentação - %s`,
});

const { params } = useRoute();

const headers = [
  { title: "Referência", key: "produto_chave" },
  { title: "Código fabricante", key: "name" },
  { title: "Tipo de movimentação", key: "type_movement" },
  { title: "Custo", key: "cost" },
  { title: "Entrada", key: "input" },
  { title: "Saida", key: "output" },
  { title: "Saldo", key: "balance" },
  { title: "Data da movimentação", key: "date_movement" },
];

const { status, data } = await $api<StockMovementHistory>("stock-movement-history", {
  params: {
    name: params.name,
  },
});

const itemRowBackground = (item: any) => {
  return item.protein > 4.2 ? "style-1" : "style-2";
};
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
    </div>

    <v-sheet class="mx-2 mt-2" rounded="xl" elevation="5">
      <v-toolbar title="HISTORICO DE MOVIMENTAÇÃO" rounded="t-xl" class="mb-5" />

      <v-data-table
        v-if="status == 'success'"
        :headers="headers"
        :items="data?.rows"
        items-per-page="-1"
        multi-sort
        hide-default-footer
        :item-class="itemRowBackground"
      >
        <template #item.date_movement="{ item }">
          <DateString
            :date="item.date_movement"
            format-for="DD/MM/YYYY HH:mm:ss"
            format-from="YYYY-MM-DDTHH:mm:ss"
          />
        </template>

        <template #item.cost="{ item }">
          <ToLocaleString :value="item.cost" />
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<style scoped>
.style-1 {
  background-color: rgb(215, 215, 44);
}
.style-2 {
  background-color: rgb(114, 114, 67);
}
</style>
