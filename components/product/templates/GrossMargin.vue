<script setup lang="ts">
const props = defineProps<{
  price: number | string | null;
  cost: number | string | null;
}>();

const calculeteGrossMargin = () => {
  return props.price !== "0.000"
    ? (parseFloat(`${props.price ?? 0.0}`) * 100) / parseFloat(`${props.cost ?? 0.0}`) -
        100
    : "0.00";
};
</script>

<template>
  <span>{{
    calculeteGrossMargin().toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }}</span>
</template>
