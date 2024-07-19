<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean | undefined;
  readonly?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
}>();
</script>

<template>
  <v-switch
    inset
    :label="label"
    color="primary"
    density="compact"
    :readonly="readonly"
    :disabled="disabled"
    :hide-details="hideDetails"
  />
</template>
