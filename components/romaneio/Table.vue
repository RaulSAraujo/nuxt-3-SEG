<script setup lang="ts">
import type { Row } from "~/interfaces/SalesOrder.js";
defineProps<{
  items: Row[];
}>();

const headers = ref([
  { title: "TAGS", key: "tag_id" },
  { title: "NF", key: "invoice" },
  { title: "PEDIDO", key: "sale_id" },
  { title: "DATA/HORA", key: "created_at" },
  { title: "USUARIO", key: "user" },
  { title: "STATUS INI.", key: "initial_status" },
  { title: "STATUS FIN.", key: "status" },
  { title: "REF", key: "produto_chave" },
  {
    title: "DESCRIÇÃO",
    key: "description",
  },
  { title: "VENDEDOR", key: "seller" },
  { title: "CLIENTE", key: "customer" },
  { title: "LOCAL/VENDA", key: "poin_sale" },
  { title: "TRANSPORTADORA", key: "collect_company" },
  { title: "ENVIO", key: "shipment_mode" },
  { title: "RASTREIO", key: "tracking_id" },
  { title: "COLETADO", key: "collected" },
]);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    disable-sort
    items-per-page="-1"
    hide-default-footer
    density="compact"
  >
    <template #item.tag_id="{ item }">
      <RomaneioTemplateTags :tags="item.tag_id" />
    </template>

    <template #item.description="{ item }">
      <Tooltip :text="item.description" :vw="5" />
    </template>

    <template #item.initial_status="{ item }">
      <Tooltip :text="item.initial_status" :vw="5" />
    </template>

    <template #item.status="{ item }">
      <Tooltip :text="item.status" :vw="5" />
    </template>

    <template #item.user="{ item }">
      <Tooltip :text="item.user" :vw="5" />
    </template>

    <template #item.seller="{ item }">
      <Tooltip :text="item.seller" :vw="5" />
    </template>

    <template #item.customer="{ item }">
      <Tooltip :text="item.customer" :vw="5" />
    </template>

    <template #item.poin_sale="{ item }">
      <Tooltip :text="item.poin_sale" :vw="5" />
    </template>

    <template #item.shipment_mode="{ item }">
      <Tooltip :text="item.shipment_mode" :vw="5" />
    </template>

    <template #item.tracking_id="{ item }">
      <Tooltip :text="item.tracking_id" :vw="5" />
    </template>

    <template #item.collect_company="{ item }">
      <Tooltip :text="item.collect_company" :vw="6" />
    </template>

    <template #item.collected="{ item }">
      <CheckIcon :value="item.collected" readonly />
    </template>

    <template #item.created_at="{ item }">
      <DateString :date="item.created_at" />
    </template>
  </v-data-table>
</template>
