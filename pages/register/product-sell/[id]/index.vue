<script setup lang="ts"></script>

<template>
  <div>
    <v-toolbar title="DETALHES DO PRODUTO" rounded="t-xl" />

    <v-container :fluid="true">
      <ProductSellDetails />
    </v-container>

    <v-toolbar title="INFORMAÇÕES ADICIONAIS" />

    <v-container :fluid="true">
      <ProductSellAdditional />
    </v-container>
  </div>
</template>
