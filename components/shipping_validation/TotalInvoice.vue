<script setup lang="ts">
import type { Row } from "~/interfaces/ShippingValidation.js";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const freightInvoice = computed(() =>
  ((selected.value as unknown) as Row[]).reduce(
    (acc, curr) => acc + parseFloat(curr.bill_freight_price || "0.0"),
    0.0
  )
);
</script>

<template>
  <span> FATURA TOTAL: <ToLocaleString :value="freightInvoice" /> </span>
</template>
