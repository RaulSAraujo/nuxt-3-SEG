<script setup lang="ts">
import { useSortable } from "@vueuse/integrations/useSortable";

const store = useFilterStore();
const { availableFilter } = storeToRefs(store);

const { option } = useSortable("#dv", availableFilter, {
  handle: ".handle",
});
option("animation", 200);
</script>

<template>
  <v-list id="dv">
    <v-list-item
      v-for="(item, index) in availableFilter"
      :key="index"
      :title="item.label"
    >
      <template #append>
        <v-icon class="handle" icon="mdi-arrow-all" color="blue" size="small" />
        <v-btn icon="mdi-close" color="red" size="small" variant="text" />
      </template>
    </v-list-item>
  </v-list>
</template>
