<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { search, inputSaleId } = storeToRefs(checkOutStore);

const theme = useTheme();
</script>

<template>
  <v-text-field
    id="InputSaleId"
    ref="inputSaleId"
    v-model="search"
    label="Informe o numero do pedido"
    variant="outlined"
    density="compact"
    hide-details
    append-icon="mdi-send"
    class="mx-5"
    :color="theme.global.current.value.dark ? 'white' : 'black'"
    bg-color="primary"
    width="320px"
    @click:append="checkOutStore.loadSalesOrder()"
    @keyup.enter="checkOutStore.loadSalesOrder()"
  />
</template>
