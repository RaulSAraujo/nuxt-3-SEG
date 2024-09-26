<script setup lang="ts">
defineProps<{
  priority: number;
}>();

const color = (value: number) => {
  if (value == 0 || value == 1) return "text-blue";
  if (value == 2) return "text-yellow";
  if (value == 3 || value == 4) return "text-red";

  return "text-transparent";
};

const text = (value: number) => {
  if (value == 0) return "BAIXA";
  if (value == 1) return "MÉDIA";
  if (value == 2) return "ALTA";

  return "NÃO DEFINIDO"
};
</script>

<template>
  <span :class="`${color(priority)}`">
    {{ text(priority) }}
  </span>
</template>
