<script setup lang="ts"></script>

<template>
  <v-main class="mt-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para produto venda"
        :to="{
          name: 'register-product-sell',
        }"
      />

      <v-spacer />

      <ProductSellGroupButton />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <NuxtPage :keepalive="true" />
    </v-sheet>
  </v-main>
</template>
