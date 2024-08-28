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

const preferentialWarehouse = warehousesRes.data.value?.PreferentialWarehouse ?? null;
const warehousesAddresses = warehousesRes.data.value?.WarehousesAddresses ?? [];
const erpWarehouses = erpWarehousesRes.data.value?.rows ?? [];
</script>

<template>
  <v-sheet rounded="xl">
    <v-toolbar title="ARMAZENAGEM PREFERENCIAL" rounded="t-xl" />

    <ProductStorageTablePreferentialStorage
      :preferential-warehouse="preferentialWarehouse"
      :erp-warehouses="erpWarehouses"
    />

    <v-toolbar title="LOCAIS DE ARMAZENAGEM" />

    <ProductStorageTableMyTable
      :warehouses-addresses="warehousesAddresses"
      :erp-warehouses="erpWarehouses"
    />
  </v-sheet>
</template>
