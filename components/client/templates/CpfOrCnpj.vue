<script setup lang="ts">
defineProps<{
  value: string | null;
}>();

const formatCnpjOrCPF = (value: string | null) => {
  if (value === null || value.length == 0) return;

  value = value.replace(/\D/g, "");

  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  } else {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
  }
};
</script>

<template>
  <span>{{ formatCnpjOrCPF(value) }}</span>
</template>
