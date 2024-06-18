<script setup lang="ts">
// import type { User } from "~/interfaces/User";

// interface FilterData {
//   resultCount: number;
//   rows: {
//     available_filters: {}[];
//     hidden_filters: {}[];
//   }[];
//   totalRecords: number;
// }

// const { data } = useAuth();
// const user = data.value as User;

const { findModelName } = useModelStore();
const { name }: any = useRoute();
const modelName = findModelName(name);

// const resFilter = await $api(`custom-filters-user?user_id=${user.id}&model=${modelName}`);

// if (resFilter.error.value) {
//   console.error(resFilter.error.value);
// }

// const filter = resFilter.data.value as FilterData;
</script>

<template>
  <Table title="PRODUTO COMPRA" url="product" :model="modelName" :disabled-menu="true">
    <template #item.action>
      <v-btn icon="mdi-pencil" />
    </template>
  </Table>
</template>
