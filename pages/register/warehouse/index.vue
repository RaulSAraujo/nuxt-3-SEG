<script setup lang="ts">
useHead({
  titleTemplate: `Almoxarifados - %s`,
});
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter :activate-creation-button="false" />

      <Table
        title="ALMOXARIFADOS"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      />
    </v-sheet>
  </v-main>
</template>
