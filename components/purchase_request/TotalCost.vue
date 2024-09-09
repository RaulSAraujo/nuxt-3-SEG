<script setup lang="ts">
import type { Row } from "~/interfaces/PurchaseRequest.js";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const valueTotal = computed(() =>
  ((selected.value as unknown) as Row[]).reduce(
    (acc, curr) => acc + parseFloat(curr.cost) * curr.quantity_purchased,
    0.0
  )
);
</script>

<template>
  <span> Total: <ToLocaleString :value="valueTotal" /> </span>
</template>
