<script setup>
defineProps({
  item: { type: Object, default: {} },
});
</script>

<template>
  <v-icon
    size="20px"
    :icon="item.ProductSell.syncecomfailed == true ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="item.ProductSell.syncecomfailed == true ? 'green' : 'red'"
  />
</template>
