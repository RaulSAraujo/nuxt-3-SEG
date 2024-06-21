<script setup lang="ts">
defineProps<{
  promotion_price: number | string | null;
}>();
</script>

<template>
  <span>
    {{
      parseFloat(`${promotion_price ?? 0.0}`).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
