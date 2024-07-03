<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Produto venda - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "product-sell";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = false;

</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter />

      <Table
        title="PRODUTO VENDA"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      />

      <TableFooter />
    </v-sheet>
  </v-main>
</template>
