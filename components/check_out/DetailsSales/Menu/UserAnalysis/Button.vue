<script setup lang="ts">
import type { UserAnalysis } from "~/interfaces/UserAnalysis.js";

const checkOutStore = useCheckOutStore();
const { itemsUserAnalysis, dateUserAnalysis, loadingUserAnalysis } = storeToRefs(
  checkOutStore
);

const { databaseDate } = useDateConversion();

const formatDate = computed(() => {
  const array = dateUserAnalysis.value.split(" - ");

  return array.map((date) => databaseDate(date));
});

const { $customFetch } = useNuxtApp();

const refresh = async () => {
  loadingUserAnalysis.value = true;

  itemsUserAnalysis.value = await $customFetch<UserAnalysis>(
    `sales-order/user-analysis?created_at=[${formatDate.value}]`
  );

  loadingUserAnalysis.value = false;
};

refresh();
</script>

<template>
  <v-btn text="BUSCAR" base-color="primary" @click="refresh" />
</template>
