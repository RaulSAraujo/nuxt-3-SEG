<script setup lang="ts">
defineProps<{
  label?: string;
  disabled?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
  min?: number;
  max?: number;
  step?: number;
}>();
</script>

<template>
  <v-number-input
    :label="label"
    :min="min"
    :max="max"
    :step="step"
    :inset="false"
    :reverse="false"
    density="compact"
    variant="outlined"
    :hide-input="false"
    control-variant="split"
    :hide-details="hideDetails"
  />
</template>
