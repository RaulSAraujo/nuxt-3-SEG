<script setup lang="ts">
defineProps<{
  label?: string;
  inline?: boolean;
  hideDetails?: boolean | "auto" | undefined;
  color?: string;
  disabled?: boolean;
  appendIcon?: string;
  prependIcon?: string;
  alt?: string;
}>();
</script>

<template>
  <v-radio-group
    :id="alt || label"
    :label="label"
    :inline="inline || true"
    :hide-details="hideDetails"
    :color="color || 'blue'"
    :disabled="disabled"
    :append-icon="appendIcon"
    :prepend-icon="prependIcon"
  >
    <slot />
  </v-radio-group>
</template>
