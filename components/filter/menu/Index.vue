<script setup lang="ts">
defineProps<{
  hideMenu?: boolean;
  hideExcel?: boolean;
  hideGrid?: boolean;
  hideFilter?: boolean;
}>();
</script>

<template>
  <v-menu location="top" offset="3px 0px">
    <template #activator="{ props }">
      <v-btn
        v-if="!hideMenu"
        v-bind="props"
        icon="mdi-dots-vertical"
        variant="plain"
        color="primary"
        density="comfortable"
      />
    </template>

    <v-btn-toggle divided rounded="lg">
      <slot name="menu" />

      <FilterMenuExcelButton v-if="!hideExcel" />

      <FilterMenuFilterButton v-if="!hideFilter" />

      <FilterMenuGridButton v-if="!hideGrid" />
    </v-btn-toggle>
  </v-menu>
</template>
