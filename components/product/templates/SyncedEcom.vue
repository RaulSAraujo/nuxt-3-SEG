<script setup lang="ts">
defineProps<{
  syncedEcom: boolean;
}>();
</script>

<template>
  <v-icon
    size="20px"
    :icon="syncedEcom ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="syncedEcom ? 'green' : 'red'"
  />
</template>
