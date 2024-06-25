<script setup lang="ts">
const store = useFilterStore();
</script>

<template>
  <v-tooltip
    location="top"
    text="CONFIGURAÇÕES DE FILTRO"
    style="
      --v-theme-surface-variant: 0, 204, 204;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-table-filter" style="color: cyan" @click="store.switchDrawer()" />
    </template>
  </v-tooltip>
</template>
