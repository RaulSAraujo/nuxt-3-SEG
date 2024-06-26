<script setup lang="ts">
defineProps<{
  label: string;
  clearable: boolean | undefined;
  approximate: boolean | undefined;
}>();

defineEmits(["enter"]);
</script>

<template>
  <v-text-field
    density="compact"
    variant="outlined"
    hide-details="auto"
    color="primary"
    :label="label"
    :clearable="clearable"
    :hint="approximate ? 'Filtro aproximado' : 'Filtro exato'"
    @keypress.enter="$emit('enter')"
  />
</template>
