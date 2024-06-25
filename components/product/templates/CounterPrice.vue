<script setup lang="ts">
defineProps<{
  counterPrice: number | string | null;
}>();
</script>

<template>
  <span>
    {{
      parseFloat(`${counterPrice}` ?? 0.0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
