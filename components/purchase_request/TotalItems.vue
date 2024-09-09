<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseRequest.js";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const totalItems = computed(() =>
  ((selected.value as unknown) as Row[]).reduce(
    (acc, curr) => acc + curr.quantity_purchased,
    0
  )
);
</script>

<template>
  <span> Total items: {{ totalItems }} </span>
</template>
