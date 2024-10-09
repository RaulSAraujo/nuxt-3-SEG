<script setup lang="ts">
defineProps<{
  label: string;
  rows?: string | number;
  disabled?: boolean | undefined;
  autoGrow?: boolean | undefined;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  hideDetails?: boolean | "auto" | undefined;
  alt?: string;
}>();

defineEmits(["enter"]);
</script>

<template>
  <v-textarea
    :id="alt || label"
    :label="label"
    color="primary"
    density="compact"
    variant="outlined"
    :disabled="disabled"
    :auto-grow="autoGrow"
    :rows="rows || 1"
    :clearable="clearable"
    :placeholder="placeholder"
    :hide-details="hideDetails || true"
    :shaped="true"
  />
</template>
