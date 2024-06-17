<script setup>
const headers = ref([
  { text: "id", value: "id" },
  { text: "name", value: "name" },
]);

const items = ref([]);
const totalItems = ref(0);
const loading = ref(false);

const loadItems = async (
  options = { page: 1, itemsPerPage: 10, sortBy: [], groupBy: [] }
) => {
  loading.value = true;

  const { data } = await useAsyncData("Product", async () => {
    const res = await $api().get(`product`, {
      page: options.page,
      perPage: options.itemsPerPage,
    });

    return res;
  });

  //   items.value = rows;
  //   totalItems.value = totalRecords;
  loading.value = false;
};
</script>

<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    loading-text="Loading... Please wait"
    @update:options="loadItems"
  ></v-data-table-server>
</template>
