<script setup lang="ts">
import type { AsyncData } from "#app";
const headers = ref<{ text: string; value: string }[]>([
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

  const res = await $api().get(`product`, {
    params: {
      page: options.page,
      perPage: options.itemsPerPage,
    },
    timeout: 3000,
    retry: 3,
    retryStatusCodes: [408],
  });

  if(res?.error.value){
    return console.error(res?.error.value)
  }

  const data = res?.data.value as { resultCount: number, rows: [], totalRecords: number }

  items.value = data.rows;
  totalItems.value = data.totalRecords;
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
