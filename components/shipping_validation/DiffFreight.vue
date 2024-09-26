<script setup lang="ts">
import type { Row } from "~/interfaces/ShippingValidation.js";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const diffFreight = computed(() =>
  ((selected.value as unknown) as Row[]).reduce(
    (acc, curr) => acc + parseFloat(curr.freight_diff_price),
    0.0
  )
);
</script>

<template>
  <span class="mx-1">DIFF FRETE TOTAL:</span>

  <ToLocaleString :value="diffFreight" class="mx-1" />
</template>
