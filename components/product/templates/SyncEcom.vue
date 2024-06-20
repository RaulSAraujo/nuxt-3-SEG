<script setup>
defineProps({
  item: { type: Object, default: {} },
});
</script>

<template>
  <v-icon
    size="20px"
    :icon="item.ProductSell.syncecom == true ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="item.ProductSell.syncecom == true ? 'green' : 'red'"
  />
</template>
