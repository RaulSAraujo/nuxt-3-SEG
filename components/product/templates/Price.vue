<script setup lang="ts">
defineProps<{
  price: string | number | null;
  promotion_price: string | number | null;
  promotion_ends_at: string | Date | null;
}>();
</script>

<template>
  <span
    v-if="
      promotion_price == 0 ||
      promotion_price == null ||
      (promotion_ends_at && promotion_ends_at < new Date().toISOString())
    "
  >
    {{
      parseFloat(`${price}` ?? "0.00").toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
