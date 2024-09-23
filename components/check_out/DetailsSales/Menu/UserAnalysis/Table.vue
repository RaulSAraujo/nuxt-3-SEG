<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { itemsUserAnalysis, loadingUserAnalysis } = storeToRefs(checkOutStore);

type TableHeader = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: TableHeader[] = [
  { title: "Usuario", key: "user" },
  { title: "Quant. total", key: "total_quantity" },
  { title: "Total peso cúbico", key: "total_weight_cubic" },
  { title: "Tempo médio", key: "average_time" },
  { title: "Erros", key: "warranty", align: "center" },
  { title: "Correios", key: "correios", align: "center" },
  { title: "Jadlog", key: "jadlog", align: "center" },
  { title: "Kangu", key: "kangu", align: "center" },
  { title: "Magazine luiza", key: "magazine_luiza", align: "center" },
  { title: "Mandae", key: "mandae", align: "center" },
  { title: "Mercado livre", key: "mercado_livre", align: "center" },
  { title: "Shopee", key: "shopee", align: "center" },
  { title: "Smart envios", key: "smart_envios", align: "center" },
  { title: "Total express", key: "total_express", align: "center" },
  { title: "Retirada na loja", key: "retirada_na_loja", align: "center" },
  { title: "Sem transportadora", key: "sem_transportadora", align: "center" },
];
</script>

<template>
  <v-data-table
    v-if="!loadingUserAnalysis"
    :headers="headers"
    :items="itemsUserAnalysis?.results"
    disable-sort
    hide-default-footer
    class="mb-5"
  >
    <template #item.user="{ item }">
      <Tooltip :text="item.user" :vw="4" />
    </template>

    <template #item.correios="{ item }">
      <span>{{ item.correios ?? 0 }}</span>
    </template>

    <template #item.jadlog="{ item }">
      <span>{{ item.jadlog ?? 0 }}</span>
    </template>

    <template #item.kangu="{ item }">
      <span>{{ item.kangu ?? 0 }}</span>
    </template>

    <template #item.magazine_luiza="{ item }">
      <span>{{ item.magazine_luiza ?? 0 }}</span>
    </template>

    <template #item.mandae="{ item }">
      <span>{{ item.mandae ?? 0 }}</span>
    </template>

    <template #item.mercado_livre="{ item }">
      <span>{{ item.mercado_livre ?? 0 }}</span>
    </template>

    <template #item.retirada_na_loja="{ item }">
      <span>{{ item.retirada_na_loja ?? 0 }}</span>
    </template>

    <template #item.sem_transportadora="{ item }">
      <span>{{ item.sem_transportadora ?? 0 }}</span>
    </template>

    <template #item.shopee="{ item }">
      <span>{{ item.shopee ?? 0 }}</span>
    </template>

    <template #item.smart_envios="{ item }">
      <span>{{ (item.smart_envios ?? 0) + (item?.smart_envios_ ?? 0) }}</span>
    </template>

    <template #item.total_express="{ item }">
      <span>{{ item.total_express ?? 0 }}</span>
    </template>
  </v-data-table>

  <v-skeleton-loader v-else type="table-heading, table-thead, table-tbody" />
</template>
