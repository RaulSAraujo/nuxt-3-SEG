<script setup lang="ts">
import type { QuotationItem } from "~/interfaces/Quotation.js";

defineProps<{
  items: QuotationItem[];
}>();

const headers = ref([
  { title: "Id", key: "id" },
  { title: "Cod. fabricante", key: "name" },
  { title: "Aplicado", key: "applied" },
  { title: "Aplicado parcial", key: "parcial_quotation" },
  { title: "Cancelado", key: "canceled" },
  { title: "Não encontrado", key: "not_found" },
  { title: "Disponibilidade", key: "availability" },
  { title: "Lead time", key: "lead_time" },
  { title: "Estoque virtual", key: "virtual_quantity" },
  { title: "Custo", key: "cost" },
  { title: "Iniciado em", key: "start_at" },
  { title: "terminado em", key: "finish_at" },
]);
</script>

<template>
  <v-data-table
    :items="items"
    item-key="id"
    :headers="headers"
    hide-default-footer
    disable-sort
    items-per-page="-1"
  >
    <template #item.cost="{ item }">
      <ToLocaleString :value="item.cost_after" class="text-red" />
      <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
      <ToLocaleString :value="item.cost_before" class="text-green" />
    </template>

    <template #item.availability="{ item }">
      <div class="d-flex align-center" style="height: 15px; width: 15px">
        <QuotationTemplatesAvailability :availability="item.availability_after ?? ''" />
        <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
        <QuotationTemplatesAvailability :availability="item.availability_before ?? ''" />
      </div>
    </template>

    <template #item.lead_time="{ item }">
      <span class="text-red">{{ item.lead_time_after ?? 0 }}</span>
      <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
      <span class="text-green">{{ item.lead_time_before ?? 0 }}</span>
    </template>

    <template #item.virtual_quantity="{ item }">
      <span class="text-red">{{ item.virtual_quantity_after ?? 0 }}</span>
      <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
      <span class="text-green">{{ item.virtual_quantity_before ?? 0 }}</span>
    </template>

    <template #item.applied="{ item }">
      <CheckIcon :value="item.applied" :readonly="true" />
    </template>

    <template #item.parcial_quotation="{ item }">
      <CheckIcon :value="item.parcial_quotation" :readonly="true" />
    </template>

    <template #item.canceled="{ item }">
      <CheckIcon :value="item.canceled" :readonly="true" />
    </template>

    <template #item.not_found="{ item }">
      <CheckIcon :value="item.not_found" :readonly="true" />
    </template>

    <template #item.start_at="{ item }">
      <DateString
        :date="item.start_at ?? null"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>

    <template #item.finish_at="{ item }">
      <DateString
        :date="item.finish_at ?? null"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>
  </v-data-table>
</template>
