<script setup lang="ts">
defineProps<{
  disabledMenu: boolean;
}>();

const filterStore = useFilterStore();

const tableStore = useTableStore();
const { page } = storeToRefs(tableStore);

const clear = () => {
  filterStore.clearValues();

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

    <FilterMenu :disabled="disabledMenu">
      <template #menu>
        <slot name="menu" />
      </template>
    </FilterMenu>
  </div>
</template>
