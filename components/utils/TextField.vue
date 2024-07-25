<script setup lang="ts">
defineProps<{
  label?: string;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
}>();

defineEmits(["enter"]);
</script>

<template>
  <v-text-field
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    :disabled="disabled"
    :hide-details="hideDetails"
    :placeholder="placeholder"
    @keypress.enter="$emit('enter')"
  />
</template>
