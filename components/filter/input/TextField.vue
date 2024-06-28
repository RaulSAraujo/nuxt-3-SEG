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
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    hide-details
    :placeholder="approximate ? 'Digite o valor aproximado' : 'Digite o valor exato'"
    @keypress.enter="$emit('enter')"
  />
</template>
