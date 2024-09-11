<script setup lang="ts">
import { useSortable } from "@vueuse/integrations/useSortable";

const props = defineProps<{
  availableOrHidden: boolean;
}>();

const store = useGridStore();
const { availableGrid, hiddenGrid } = storeToRefs(store);

const el = ref<HTMLElement | null>(null);

useSortable(el, availableGrid, {
  handle: ".handle",
});

const active = computed(() =>
  props.availableOrHidden ? hiddenGrid.value : availableGrid.value
);
</script>

<template>
  <v-list ref="el">
    <v-list-item v-for="(item, index) in active" :key="item.key" :title="item.title">
      <template v-if="!availableOrHidden" #append>
        <v-icon class="handle" icon="mdi-arrow-all" color="blue" size="small" />
        <v-btn
          icon="mdi-close"
          color="red"
          size="small"
          variant="text"
          @click="store.remove(index, item)"
        />
      </template>

      <template v-else #append>
        <v-btn
          icon="mdi-plus"
          color="green"
          size="small"
          variant="text"
          @click="store.add(index, item)"
        />
      </template>
    </v-list-item>
  </v-list>
</template>
