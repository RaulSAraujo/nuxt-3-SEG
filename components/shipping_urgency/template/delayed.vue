<script setup lang="ts">
defineProps<{
  delayed: boolean;
}>();
</script>

<template>
  <v-icon
    :icon="delayed ? 'mdi-timer-alert' : 'mdi-minus'"
    :color="delayed ? 'red' : 'blue'"
  />
</template>
