<script setup>
defineProps({
  item: { type: Object, default: {} },
});
</script>

<template>
  <v-icon
    size="20px"
    :icon="item.ProductSell.syncecominprogress == true ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="item.ProductSell.syncecominprogress == true ? 'green' : 'red'"
  />
</template>
