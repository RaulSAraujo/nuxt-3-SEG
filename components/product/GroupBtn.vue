<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
</script>

<template>
  <v-btn-toggle variant="plain" color="primary">
    <v-btn
      icon="mdi-home-edit"
      @click="
        $router.replace({
          name: 'register-product-id',
          params: { id: $route.params.id },
        })
      "
    />

    <v-btn
      :to="{
        name: 'register-product-id-cost-table',
        params: { id: $route.params.id },
      }"
    >
      Tabela de custos
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-id-status-table',
        params: { id: $route.params.id },
      }"
    >
      Tabela de status
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-id-type-type_id',
        params: {
          id: $route.params.id,
          type: product?.type,
          type_id: product?.type_id,
        },
      }"
    >
      Familia/Kit
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-id-imagens',
        params: { id: $route.params.id },
      }"
    >
      Imagens
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-id-storage-table',
        params: { id: $route.params.id },
      }"
    >
      Armazenagem
    </v-btn>
  </v-btn-toggle>
</template>
