1<script setup lang="ts"></script>

<template>
  <v-btn-toggle variant="plain" color="primary">
    <v-btn
      icon="mdi-home-edit"
      @click="
        $router.replace({
          name: 'register-product-name',
          params: { name: $route.params.name },
        })
      "
    />

    <v-btn
      :to="{
        name: 'register-product-name-cost-table',
        params: { name: $route.params.name },
      }"
    >
      Tabela de custos
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-name-status-table',
        params: { name: $route.params.name },
      }"
    >
      Tabela de status
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-name-type-type_id',
        params: {
          name: $route.params.name,
          type: 'Family',
          type_id: 1,
        },
      }"
    >
      Familia/Kit
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-name-imagens',
        params: { name: $route.params.name },
      }"
    >
      Imagens
    </v-btn>

    <v-btn
      :to="{
        name: 'register-product-name-storage-table',
        params: { name: $route.params.name },
      }"
    >
      Armazenagem
    </v-btn>
  </v-btn-toggle>
</template>
