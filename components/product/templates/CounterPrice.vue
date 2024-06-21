<script setup lang="ts">
defineProps<{
  counter_price: number | string | null;
}>();
</script>

<template>
  <span>
    {{
      parseFloat(`${counter_price}` ?? 0.0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
