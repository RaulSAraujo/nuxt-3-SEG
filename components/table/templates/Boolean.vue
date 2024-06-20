<script setup lang="ts">
defineProps<{ value: boolean | null }>();
</script>

<template>
  <v-icon
    size="20px"
    :icon="value == true ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="value == true ? 'green' : 'red'"
  />
</template>
