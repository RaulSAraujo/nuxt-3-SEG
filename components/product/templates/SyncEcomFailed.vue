<script setup lang="ts">
defineProps<{
  syncEcomFailed: boolean;
}>();
</script>

<template>
  <v-icon
    size="20px"
    :icon="syncEcomFailed ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="syncEcomFailed ? 'green' : 'red'"
  />
</template>
