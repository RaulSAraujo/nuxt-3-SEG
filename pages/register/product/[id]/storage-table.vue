<script setup lang="ts">
import type {
  Product,
  PreferentialWarehouse,
  WarehousesAddresses,
} from "~/interfaces/Product.js";
import type { ERPWarehouses } from "~/interfaces/ErpWarehouses.js";
const { params } = useRoute();

interface Warehouse {
  PreferentialWarehouse: PreferentialWarehouse | null;
  WarehousesAddresses: WarehousesAddresses[];
}

const [warehousesRes, erpWarehousesRes] = await Promise.all([
  $api<Warehouse>("product", {
    key: "Warehouse",
    params: {
      id: params.id,
      warehouses: true,
    },
    transform: (fetchedData) => {
      const firstRow = ((fetchedData as unknown) as Product).rows[0];

      return {
        PreferentialWarehouse: firstRow?.PreferentialWarehouse || null,
        WarehousesAddresses: firstRow?.WarehousesAddresses || [],
      };
    },
  }),
  $api<ERPWarehouses>(`erp-warehouses`, {
    key: "WarehousesList",
    pick: ["rows"],
  }),
]);

const preferentialWarehouse = warehousesRes.data.value!.PreferentialWarehouse;
const warehousesAddresses = warehousesRes.data.value!.WarehousesAddresses;
const erpWarehouses = erpWarehousesRes.data.value?.rows ?? [];

const headers = ref([
  {
    title: "ALMOXARIFADO",
    key: "almox",
  },
  {
    title: "LOCALIZAÇÃO",
    key: "localizacao",
  },
  {
    title: "ESTOQUE",
    key: "estatual",
  },
  {
    title: "ESTOQUE MIN.",
    key: "estminimo",
  },
  {
    title: "DATA COMPRA",
    key: "dtcompra",
  },
  {
    title: "DATA VENDA",
    key: "dtvenda",
  },
]);
</script>

<template>
  <v-container fluid>
    <span class="text-h5 font-weight-bold">ARMAZENAGEM PREFERENCIAL</span>

    <v-row v-if="preferentialWarehouse" dense class="mt-3 mx-2">
      <v-col>
        <TextField
          v-model="preferentialWarehouse.almox"
          label="CÓDIGO"
          :disabled="true"
        />
      </v-col>
      <v-col>
        <Select
          v-model="preferentialWarehouse.almox"
          label="ALMOXARIFADO"
          :items="erpWarehouses"
          item-title="descricao"
          item-value="codigo"
          :multiple="false"
          disabled
        />
      </v-col>
      <v-col>
        <TextField
          v-model="preferentialWarehouse.estatual"
          label="ESTOQUE"
          :disabled="true"
        />
      </v-col>
      <v-col>
        <TextField
          v-model="preferentialWarehouse.localizacao"
          label="LOCALIZAÇÃO"
          :disabled="true"
        />
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="py-6">
      <span>Este produto não possui armazém Preferencial.</span>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="warehousesAddresses"
      hide-default-footer
      disable-filtering
      disable-sort
      disable-pagination
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title>LOCAIS DE ARMAZENAGEM</v-toolbar-title>
        </v-toolbar>
      </template>

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
  </v-container>
</template>
