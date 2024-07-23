<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const headers = ref([
  { text: "ID", value: "id" },
  { text: "ID produto", value: "product_id" },
  { text: "Status", value: "pstatus_id" },
  { text: "Criado em", value: "created_at" },
  { text: "Alterado em", value: "updated_at" },
]);
</script>

<template>
  <v-data-table :items="product!.Pstatuses" :headers="headers" hide-default-footer>
    <template #item.pstatus_id="{ item }">
      <span>{{ item.name }}</span>
    </template>

    <template #item.created_at="{ item }">
      <DateString :date="item.created_at" />
    </template>

    <template #item.updated_at="{ item }">
      <DateString :date="item.created_at" />
    </template>
  </v-data-table>
</template>
