<script setup lang="ts">
import type { Column } from "~/interfaces/Filter";
import { useSortable } from "@vueuse/integrations/useSortable";

const props = defineProps<{
  availableOrHidden: boolean;
}>();

const store = useFilterStore();
const { availableFilter, hiddenFilter } = storeToRefs(store);

const el = ref<HTMLElement | null>(null);

useSortable(el, availableFilter, {
  handle: ".handle",
});

const active = computed(() =>
  props.availableOrHidden ? hiddenFilter.value : availableFilter.value
);

const getSize = (item: Column) => {
  return item.layout_filters?.size ?? 0;
};

const setSize = (item: Column, value: number) => {
  if (item.layout_filters) {
    item.layout_filters.size = value;
  }
};
</script>

<template>
  <v-list ref="el">
    <v-list-item
      v-for="(item, index) in active"
      :key="item.attribute"
      :title="item.label"
    >
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

      <template v-if="availableOrHidden === false" #subtitle>
        <div class="ml-1">
          <v-slider
            :model-value="getSize(item)"
            density="compact"
            color="primary"
            max="12"
            min="1"
            step="1"
            hide-details
            @update:model-value="(value: number) => setSize(item, value)"
          />
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>
