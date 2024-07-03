<script setup lang="ts">
defineProps<{
  label: string;
  value: [];
  items: [];
  itemTitle: string;
  itemValue: string;
  clearable: boolean | undefined;
  multiple: boolean | undefined;
}>();
</script>

<template>
  <v-combobox
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="multiple"
    hide-details
  >
    <template v-if="multiple" #selection="{ item, index }">
      <span
        v-if="index < 1"
        style="
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        "
        >{{ item.title }}</span
      >

      <span v-if="index === 1" class="text-grey text-caption align-self-center">
        (+{{ (value?.length ?? 1) - 1 }})
      </span>
    </template>
  </v-combobox>
</template>

<style>
.v-combobox__selection {
  max-width: 70%;
}
</style>
