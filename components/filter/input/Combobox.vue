<script setup lang="ts">
defineProps<{
  label: string;
  value: string | readonly string[] | null | undefined;
  clearable: boolean | undefined;
  items: [];
  itemTitle: string;
  itemValue: string;
  multiple: boolean | undefined;
}>();
</script>

<template>
  <v-combobox
    density="compact"
    variant="outlined"
    color="primary"
    hide-details
    :label="label"
    :clearable="clearable"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="multiple"
    small-chips
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
