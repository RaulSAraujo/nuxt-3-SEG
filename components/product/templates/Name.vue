<script setup lang="ts">
defineProps<{ name: string | null; observationCodFab: string | null }>();
</script>

<template>
  <span v-if="!observationCodFab && name">
    {{ name.toUpperCase() }}
  </span>

  <v-tooltip v-else location="top" :text="observationCodFab?.toUpperCase()">
    <template #activator="{ props }">
      <span v-bind="props" class="text-red"> {{ name?.toUpperCase() }} </span>
    </template>
  </v-tooltip>
</template>
