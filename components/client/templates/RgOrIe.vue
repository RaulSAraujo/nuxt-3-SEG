<script setup lang="ts">
defineProps<{
  value: string | null;
}>();

const formatRgOrIe = (value: string | null) => {
  if (value === null || value.length == 0) return;

  value = value.replace(/\D/g, "");

  return value.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
};
</script>

<template>
  <span>{{ formatRgOrIe(value) }}</span>
</template>
