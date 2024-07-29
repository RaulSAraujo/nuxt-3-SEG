<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Almoxarifados - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "erp-warehouses";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = false;
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter />

      <Table
        title="ALMOXARIFADOS"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      />
    </v-sheet>
  </v-main>
</template>
