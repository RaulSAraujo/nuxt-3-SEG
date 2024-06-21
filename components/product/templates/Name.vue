<script setup lang="ts">
defineProps<{ name: string | null; observation_cod_fab: string | null }>();
</script>

<template>
  <span v-if="!observation_cod_fab && name">
    {{ name?.toUpperCase() }}
  </span>

  <v-tooltip v-else location="top" :text="observation_cod_fab?.toUpperCase()">
    <template v-slot:activator="{ props }">
      <span v-bind="props" class="text-red"> {{ name?.toUpperCase() }} </span>
    </template>
  </v-tooltip>
</template>
