<script setup lang="ts"></script>

<template>
  <div>
    <v-toolbar title="STATUS DO PRODUTO" rounded="t-xl" class="pr-4">
      <ProductStatusTableStatusAssociation />
    </v-toolbar>

    <v-container fluid>
      <ProductStatusTable />
    </v-container>
  </div>
</template>
