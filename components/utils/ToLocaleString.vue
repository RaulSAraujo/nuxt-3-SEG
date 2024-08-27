<script setup lang="ts">
defineProps<{
  value: string | number | null;
}>();
</script>

<template>
  <span>
    {{
      parseFloat(`${value || 0.0}`).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
