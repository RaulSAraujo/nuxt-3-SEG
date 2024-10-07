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

const itemRowBackground = (row: { index: number }) => {
  if (row.index % 2 === 0) {
    return {
      class: "background-color-in-historical-movement-1",
    };
  } else {
    return {
      class: "background-color-in-historical-movement-2",
    };
  }
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
        :row-props="itemRowBackground"
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

<style>
.background-color-in-historical-movement-1 {
  background-color: rgb(39, 39, 39);
}
</style>
