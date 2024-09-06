<script setup lang="ts">
defineEmits(["add"]);

const activeScanMode = ref(true);
</script>

<template>
  <ProductLabelFindServerCombobox v-if="activeScanMode" />

  <ProductLabelFindServerScanMode v-else />

  <ProductLabelInternalProduct />

  <v-tooltip
    location="top"
    :text="activeScanMode ? 'Ativar o modo coletor' : 'Desativar modo coletor'"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        :icon="activeScanMode ? 'mdi-barcode-scan' : 'mdi-barcode-off'"
        class="mr-2"
        color="blue"
        variant="plain"
        @click="activeScanMode = !activeScanMode"
      />
    </template>
  </v-tooltip>
</template>
