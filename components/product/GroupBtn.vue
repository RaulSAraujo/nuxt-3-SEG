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
      v-if="product?.type == 'FAMILY'"
      text="Tabela de custos"
      :to="{
        name: 'register-product-id-cost-table',
        params: { id: $route.params.id },
      }"
    />

    <v-btn
      text="Tabela de status"
      :to="{
        name: 'register-product-id-status-table',
        params: { id: $route.params.id },
      }"
    />

    <v-btn
      text="Familia/Kit"
      :to="{
        name: 'register-product-id-type-type_id',
        params: {
          id: $route.params.id,
          type: product?.type,
          type_id: product?.type_id,
        },
      }"
    />

    <v-btn
      text="Imagens"
      :to="{
        name: 'register-product-id-imagens',
        params: { id: $route.params.id },
      }"
    />

    <v-btn
      text="Armazenagem"
      :to="{
        name: 'register-product-id-storage-table',
        params: { id: $route.params.id },
      }"
    />
  </v-btn-toggle>
</template>
