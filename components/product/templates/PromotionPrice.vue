<script setup lang="ts">
defineProps<{
  promotionPrice: number | string | null;
}>();
</script>

<template>
  <span>
    {{
      parseFloat(`${promotionPrice ?? 0.0}`).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
