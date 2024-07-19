<script setup lang="ts">
defineProps<{
  label: string;
  rows?: string | number;
  disabled?: boolean | undefined;
  autoGrow?: boolean | undefined;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  hideDetails?: boolean | "auto" | undefined;
}>();

defineEmits(["enter"]);
</script>

<template>
  <v-textarea
    :label="label"
    color="primary"
    density="compact"
    variant="outlined"
    :disabled="disabled"
    :auto-grow="autoGrow"
    :clearable="clearable"
    :placeholder="placeholder"
    :hide-details="hideDetails"
    :shaped="true"
  />
</template>
