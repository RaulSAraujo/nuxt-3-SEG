<script setup lang="ts">
const supplierStore = useSupplierStore();
const status = supplierStore.get();
</script>

<template>
  <v-container fluid>
    <p class="text-h5 font-weight-bold mb-5">TABELA DE CUSTOS</p>

    <ProductCostTable />

    <ProductCostTableMyTable v-if="status === 'success'" />

    <ProductCostTableInvoice />
  </v-container>
</template>
