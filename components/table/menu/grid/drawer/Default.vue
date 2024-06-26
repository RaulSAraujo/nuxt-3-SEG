<script setup lang="ts">
import { useSortable } from "@vueuse/integrations/useSortable";

const store = useGridStore();
const { availableGrid } = storeToRefs(store);

const el = ref<HTMLElement | null>(null);

useSortable(el, availableGrid, {
  handle: ".handle",
});
</script>

<template>
  <v-list ref="el">
    <v-list-item v-for="item in availableGrid" :key="item.key" :title="item.title">
      <template #append>
        <v-icon class="handle" icon="mdi-arrow-all" color="blue" size="small" />
        <v-btn icon="mdi-close" color="red" size="small" variant="text" />
      </template>
    </v-list-item>
  </v-list>
</template>
