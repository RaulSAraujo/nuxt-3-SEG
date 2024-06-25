<script setup lang="ts">
defineProps<{
  synceEcom: boolean;
}>();
</script>

<template>
  <v-icon
    size="20px"
    :icon="synceEcom ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="synceEcom ? 'green' : 'red'"
  />
</template>
