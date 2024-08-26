<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
});
</script>

<template>
  <v-menu location="top" offset="0px 0px">
    <template #activator="{ props }">
      <v-btn v-if="!disabled" icon="mdi-dots-vertical" variant="plain" color="primary" v-bind="props" />
    </template>

    <v-btn-toggle divided rounded="lg">
      <slot name="menu" />

      <FilterMenuExcelButton />

      <FilterMenuFilterButton />

      <FilterMenuGridButton />
    </v-btn-toggle>
  </v-menu>
</template>
