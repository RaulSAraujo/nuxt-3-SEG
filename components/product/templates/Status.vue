<script setup lang="ts">
defineProps<{
  pstatuses: {
    name: string;
  }[];
}>();
</script>

<template>
  <v-tooltip
    v-if="pstatuses"
    location="top"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <span v-if="pstatuses[0]" v-bind="props">
        {{ pstatuses[0].name }}
      </span>
    </template>
    <span v-for="(status, index) in pstatuses" :key="index">
      <span>
        {{ status.name }}
        <br />
      </span>
    </span>
  </v-tooltip>
</template>
