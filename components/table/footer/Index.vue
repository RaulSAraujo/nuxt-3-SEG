<script setup lang="ts">
const store = useTableStore();
const { page, pageCount, itemsPerPage, itemsPerPageoptions, totalItems } = storeToRefs(
  store
);

const { y } = useWindowScroll();

const scrollToTop = () => {
  y.value = 0;
};

watch(itemsPerPage, () => {
  scrollToTop();
});
</script>

<template>
  <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
    <div class="d-flex flex-rows justify-space-between align-center">
      <span class="ml-3 text-caption">TOTAL: {{ totalItems }}</span>

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
          max-width="110px"
          hide-details
          hide-selected
          :menu-props="{
            location: 'top',
          }"
        />

        <v-pagination v-model="page" :length="pageCount" :total-visible="7" />
      </div>
    </div>
  </v-lazy>
</template>
