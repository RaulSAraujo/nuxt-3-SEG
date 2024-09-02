<script setup lang="ts">
defineProps<{
  hideMenu?: boolean;
  hideExcel?: boolean;
  hideGrid?: boolean;
  hideFilter?: boolean;
}>();

const filterStore = useFilterStore();

const tableStore = useTableStore();
const { page, sortBy } = storeToRefs(tableStore);

const clear = () => {
  filterStore.clearValues();

  sortBy.value = undefined;

  if (page.value > 1) {
    page.value = 1;
  } else {
    tableStore.searchData();
  }
};
</script>

<template>
  <div class="d-flex justify-end mr-5 mb-5">
    <slot name="button-create" />

    <v-btn class="mr-2" color="primary" @click="tableStore.searchData"> BUSCAR </v-btn>

    <v-btn class="mr-2" variant="outlined" color="primary" @click="clear">
      Limpar Filtros
    </v-btn>

    <FilterMenu
      :hide-menu="hideMenu"
      :hide-excel="hideExcel"
      :hide-filter="hideFilter"
      :hide-grid="hideGrid"
    >
      <template #menu>
        <slot name="menu" />
      </template>
    </FilterMenu>
  </div>
</template>
