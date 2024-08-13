<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean | undefined;
  readonly?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
  alt?: string;
}>();
</script>

<template>
  <v-switch
    :id="alt || label"
    inset
    :label="label"
    color="primary"
    density="compact"
    :readonly="readonly"
    :disabled="disabled"
    :hide-details="hideDetails"
  />
</template>
