<script setup lang="ts">
const packageStore = usePackageStore();
packageStore.get();
</script>

<template>
  <v-container fluid tag="div">
    <p class="text-h5 font-weight-bold mb-5">DETALHES DO PRODUTO</p>

    <ProductDetails />

    <p class="text-h6 font-weight-medium my-3">ESTOQUE</p>

    <ProductDetailsStock />

    <p class="text-h6 font-weight-medium my-3">ESTOQUE VIRTUAL TEMPORÁRIO</p>

    <ProductDetailsVirtualStock />

    <p class="text-h6 font-weight-medium my-3">OBSERVAÇÕES</p>

    <ProductDetailsObservation />

    <p class="text-h6 font-weight-medium my-3">EMBALAGEM / PESO</p>

    <ProductDetailsPackage v-if="packageStore.status === 'success'" />
  </v-container>
</template>
