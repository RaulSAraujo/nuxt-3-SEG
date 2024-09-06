<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseRequest.js";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const collapse = ref<boolean>(false);

const totalItems = computed(() =>
  ((selected.value as unknown) as Row[]).reduce(
    (acc, curr) => acc + curr.quantity_purchased,
    0
  )
);

const valueTotal = computed(() =>
  ((selected.value as unknown) as Row[]).reduce(
    (acc, curr) => acc + parseFloat(curr.cost) * curr.quantity_purchased,
    0.0
  )
);
</script>

<template>
  <v-toolbar
    v-if="selected.length > 0"
    flat
    :collapse="collapse"
    color="primary"
    density="compact"
    class="rounded-e-xl"
    style="position: fixed; bottom: 20px; left: 0px; width: 500px"
  >
    <v-toolbar-title class="text-button">
      Selecionados: {{ selected.length }}
      <v-divider vertical />
      Total items: {{ totalItems }}
      <v-divider vertical />
      Total: <ToLocaleString :value="valueTotal" />
    </v-toolbar-title>

    <template #append>
      <v-btn
        :icon="!collapse ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        @click="collapse = !collapse"
      />
    </template>
  </v-toolbar>
</template>
