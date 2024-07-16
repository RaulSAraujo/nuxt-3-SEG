<script setup lang="ts">
const store = useTableStore();
const { page, pageCount, itemsPerPage, itemsPerPageoptions } = storeToRefs(store);

const { y } = useWindowScroll();

const scrollToTop = () => {
  y.value = 0;
};

watch(itemsPerPage, () => {
  scrollToTop();
});
</script>

<template>
  <div class="d-flex flex-rows justify-end align-center">
    <span class="mr-2 text-caption">Itens por página: </span>

    <v-select
      v-model="itemsPerPage"
      density="compact"
      color="primary"
      variant="outlined"
      :items="itemsPerPageoptions"
      item-title="title"
      item-value="value"
      max-width="90px"
      hide-details
      class="align-self-center"
    />

    <v-pagination v-model="page" :length="pageCount" :total-visible="7" />
  </div>
</template>
