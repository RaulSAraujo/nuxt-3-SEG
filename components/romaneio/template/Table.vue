<script setup lang="ts">
import type { SalesOrder } from "~/interfaces/SalesCollections.js";

defineProps<{
  SalesOrders: SalesOrder[];
}>();

const headers = ref([
  { title: "Nota fiscal", key: "invoice" },
  { title: "Pedido", key: "sale_id" },
  { title: "Data/Hora", key: "created_at" },
  { title: "Usuario", key: "user" },
  { title: "Status", key: "status" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Vendedor", key: "seller" },
  { title: "Cliente", key: "customer" },
  { title: "Local/venda", key: "poin_sale" },
  { title: "Transportadora", key: "collect_company" },
  { title: "Envio", key: "shipment_mode" },
  { title: "Rastreio", key: "tracking_id" },
  { title: "Tray coletado", key: "verified_status_ecom" },
]);
</script>

<template>
  <v-data-table
    :items="SalesOrders"
    :headers="headers"
    disable-sort
    disable-filtering
    disable-pagination
    density="compact"
    hide-default-footer
  >
    <template #item.verified_status_ecom="{ item }">
      <CheckIcon :value="item.verified_status_ecom" :readonly="true" />
    </template>

    <template #item.customer="{ item }">
      <Tooltip :text="item.customer" :vw="5" />
    </template>

    <template #item.user="{ item }">
      <Tooltip :text="item.user" :vw="5" />
    </template>

    <template #item.description="{ item }">
      <Tooltip :text="item.description" :vw="5" />
    </template>

    <template #item.created_at="{ item }">
      <DateString
        :date="item.created_at"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>
  </v-data-table>
</template>
