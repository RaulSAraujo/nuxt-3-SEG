<script setup lang="ts"></script>

<template>
  <v-menu location="top" offset="5px 0px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-dots-vertical"
        variant="plain"
        color="primary"
        density="comfortable"
      />
    </template>

    <v-btn-toggle divided rounded="lg">
      <CheckOutDetailsSalesMenuUserAnalysis />

      <FilterMenuGridButton />
    </v-btn-toggle>
  </v-menu>
</template>
