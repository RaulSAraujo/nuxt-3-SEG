<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
});
</script>

<template>
  <v-menu location="start" offset="0 0">
    <template #activator="{ props }">
      <v-btn v-if="!disabled" icon="mdi-dots-vertical" variant="plain" v-bind="props" />
    </template>

    <v-btn-toggle divided variant="outlined" rounded="lg">
      <slot name="menu" />

      <TableMenuExcelButton />

      <TableMenuFilterButton />

      <TableMenuGridButton />
    </v-btn-toggle>
  </v-menu>
</template>
