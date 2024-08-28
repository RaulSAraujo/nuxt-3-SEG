<script setup lang="ts">
import type { WarehousesAddresses } from "~/interfaces/Product.js";
import type { Row } from "~/interfaces/ErpWarehouses.js";

defineProps<{
  warehousesAddresses: WarehousesAddresses[];
  erpWarehouses: Row[];
}>();

const headers = ref([
  {
    title: "Almoxarifado",
    key: "almox",
  },
  {
    title: "Localização",
    key: "localizacao",
  },
  {
    title: "Estoque",
    key: "estatual",
  },
  {
    title: "Estoque minimo",
    key: "estminimo",
  },
  {
    title: "Data compra",
    key: "dtcompra",
  },
  {
    title: "Data venda",
    key: "dtvenda",
  },
]);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="warehousesAddresses"
    hide-default-footer
    disable-filtering
    disable-sort
    disable-pagination
  >
    <template #item.almox="{ item }">
      <span v-for="(it, index) in erpWarehouses" :key="index">
        <span v-if="item.almox == it.codigo">{{ it.descricao }}</span>
      </span>
    </template>

    <template #item.estatual="{ item }">
      <span>{{ parseInt(`${item.estatual ?? 0}`) }}</span>
    </template>

    <template #item.estminimo="{ item }">
      <span>{{ parseInt(`${item.estminimo ?? 0}`) }}</span>
    </template>

    <template #item.dtcompra="{ item }">
      <DateString :date="item.dtcompra" />
    </template>

    <template #item.dtvenda="{ item }">
      <DateString :date="item.dtvenda" />
    </template>
  </v-data-table>
</template>
