<script setup lang="ts"></script>

<template>
  <v-container fluid>
    <div class="d-flex flex-row justify-space-between mb-5">
      <p class="text-h5 font-weight-bold text-primary">
        FAMILIA ATUAL: {{ $route.params.type_id }}
      </p>

      <ProductTypeGroupButtons />
    </div>

    <ProductTypeTableFamily v-if="$route.params.type === 'family'" />

    <ProductTypeTableKit v-if="$route.params.type === 'kit'" />
  </v-container>
</template>
