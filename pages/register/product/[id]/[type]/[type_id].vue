<script setup lang="ts"></script>

<template>
  <div>
    <v-toolbar
      :title="`FAMILIA ATUAL: ${$route.params.type_id}`"
      rounded="t-xl"
      class="pr-4"
    >
      <ProductTypeGroupButtons />
    </v-toolbar>

    <v-container fluid>
      <ProductTypeTableFamily v-if="$route.params.type === 'family'" />

      <ProductTypeTableKit v-if="$route.params.type === 'kit'" />
    </v-container>
  </div>
</template>
