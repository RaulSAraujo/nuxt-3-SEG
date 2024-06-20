<script setup>
defineProps({
  item: { type: Object, default: {} },
});
</script>

<template>
  <v-icon
    size="20px"
    :icon="item.ProductSell.syncedecom == true ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="item.ProductSell.syncedecom == true ? 'green' : 'red'"
  />
</template>
