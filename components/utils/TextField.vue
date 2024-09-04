<script setup lang="ts">
defineProps<{
  label?: string;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
  alt?: string;
  loading?: boolean;
}>();

defineEmits(["enter"]);
</script>

<template>
  <v-text-field
    :id="alt || label"
    v-maska="'X'"
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    :disabled="disabled"
    :hide-details="hideDetails || true"
    :placeholder="placeholder"
    :loading="loading"
    @keypress.enter="$emit('enter')"
  />
</template>
