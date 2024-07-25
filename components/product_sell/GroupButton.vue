<script setup lang="ts"></script>

<template>
  <v-btn-toggle variant="plain" color="primary">
    <v-btn
      icon="mdi-home-edit"
      @click="
        $router.replace({
          name: 'register-product-sell-id',
          params: { id: $route.params.id },
        })
      "
    />

    <v-btn
      text="LOGS"
      :to="{
        name: 'register-product-sell-id-logs',
        params: { id: $route.params.id },
      }"
    />
  </v-btn-toggle>
</template>
