<script setup lang="ts"></script>

<template>
  <div>
    <v-toolbar title="DETALHES DO PRODUTO" rounded="t-xl" />

    <v-container :fluid="true">
      <ProductDetails />

      <p class="text-h6 font-weight-medium my-3">ESTOQUE</p>

      <ProductDetailsStock />

      <p class="text-h6 font-weight-medium my-3">ESTOQUE VIRTUAL TEMPORÁRIO</p>

      <ProductDetailsVirtualStock />

      <p class="text-h6 font-weight-medium my-3">OBSERVAÇÕES</p>

      <ProductDetailsObservation />

      <p class="text-h6 font-weight-medium my-3">EMBALAGEM / PESO</p>

      <ProductDetailsPackage />
    </v-container>
  </div>
</template>
