<script setup lang="ts">
import type { ShipmentOrders } from "~/interfaces/ShipmentOrders.js";

const { data } = await $api<ShipmentOrders>("shipment-orders");

const uniqueCollectCompanies = useSorted(
  [...new Set(data.value?.rows.map((e) => e.collect_company.toUpperCase().trim()))],
  (a, b) => a.localeCompare(b)
);
</script>

<template>
  <Combobox label="Trasportadoras" :items="uniqueCollectCompanies ?? []" clearable />
</template>
