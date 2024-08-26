<script setup lang="ts">
const store = useGridStore();
</script>

<template>
  <v-tooltip location="top" text="CONFIGURAÇÕES DA GRID">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-view-grid-plus-outline" @click="store.switchDrawer()" />
    </template>
  </v-tooltip>
</template>
