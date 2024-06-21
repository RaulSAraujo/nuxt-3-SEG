<script setup lang="ts">
defineProps<{ value: boolean | null }>();
</script>

<template>
  <v-icon
    size="20px"
    :icon="value ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="value ? 'green' : 'red'"
  />
</template>
