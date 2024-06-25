<script setup lang="ts">
defineProps<{
  syncEcomInProgress: boolean;
}>();
</script>

<template>
  <v-icon
    size="20px"
    :icon="syncEcomInProgress ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="syncEcomInProgress ? 'green' : 'red'"
  />
</template>
