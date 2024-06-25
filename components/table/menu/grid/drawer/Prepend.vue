<script setup lang="ts">
const store = useGridStore();
</script>

<template>
  <v-list-item class="pa-4 bg-blue">
    <template #append>
      <v-btn
        icon="mdi-chevron-double-left"
        size="small"
        variant="text"
        @click="store.switchDrawer()"
      />
    </template>

    <v-list-item-title>CONFIGURAÇÕES DE GRID</v-list-item-title>
    <v-list-item-subtitle class="text-caption">
      Ative, desative e ordene.
    </v-list-item-subtitle>
  </v-list-item>
</template>
