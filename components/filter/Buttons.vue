<script setup lang="ts">
defineEmits(["create"]);

const filterStore = useFilterStore();
const { activeCreateButton, changeValuesFilter } = storeToRefs(filterStore);

const tableStore = useTableStore();
const { page } = storeToRefs(tableStore);

const clear = () => {
  filterStore.clearValues();

  if (page.value > 1) {
    page.value = 1;
  } else {
    if (changeValuesFilter.value) {
      tableStore.searchData();
    }
  }
};
</script>

<template>
  <ClientOnly>
    <div class="d-flex justify-end mr-5 mb-5">
      <v-btn-toggle
        v-if="activeCreateButton"
        variant="outlined"
        density="compact"
        divided
      >
        <v-btn class="text-success" @click="$emit('create')"> CRIAR </v-btn>

        <v-btn class="text-primary" @click="tableStore.searchData"> BUSCAR </v-btn>

        <v-btn class="text-error" @click="clear">Limpar Filtros</v-btn>
      </v-btn-toggle>

      <v-btn-toggle v-else variant="outlined" density="compact" divided>
        <v-btn class="text-primary" @click="tableStore.searchData"> BUSCAR </v-btn>

        <v-btn class="text-error" @click="clear">Limpar Filtros</v-btn>
      </v-btn-toggle>
    </div>
  </ClientOnly>
</template>
