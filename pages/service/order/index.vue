<script setup lang="ts">
import type { ERPSituation } from "~/interfaces/ServiceOrder";

useHead({
  titleTemplate: `Ordem de serviço - %s`,
});

const serviceOrderStore = useServiceOrderStore();
const { situation } = storeToRefs(serviceOrderStore);

if (situation.value.length == 0) {
  const { data, status } = await $api<ERPSituation[]>("service-order/erp-situation");

  if (status.value == "success" && data.value) {
    situation.value = data.value;
  }
}
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">ORDEM DE SERVIÇO</span>

    <Filter>
      <template #button-create>
        <v-btn
          class="mr-2"
          color="primary"
          text="CRIAR"
          :to="{
            name: 'service-order-creation',
          }"
        />
      </template>
    </Filter>

    <Table
      multi-sort
      :others-params="{
        full: false,
      }"
    >
      <template #item.action>
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          color="blue"
          density="compact"
        />
      </template>

      <template #item.tat="{ item }">
        <ServiceOrderTemplateTat
          :created-at="item.created_at"
          :close-order-at="item.close_order_at"
        />
      </template>

      <template #item.region="{ item }">
        <ServiceOrderTemplateRegion :text="item.region" />
      </template>

      <template #item.service_mode="{ item }">
        <ServiceOrderTemplateServiceMode :text="item.service_mode" />
      </template>

      <template #item.type="{ item }">
        <ServiceOrderTemplateType :value="item.type" />
      </template>

      <template #item.status="{ item }">
        <ServiceOrderTemplateStatus :value="item.status" />
      </template>

      <template #item.city="{ item }">
        <Tooltip :text="item.Client.ClientAddresses[0].city" :vw="5" />
      </template>

      <template #item.total_value="{ item }">
        <ToLocaleString :value="item.total_value" />
      </template>

      <template #item.total_value_products="{ item }">
        <ToLocaleString :value="item.total_value_products" />
      </template>

      <template #item.total_value_services="{ item }">
        <ToLocaleString :value="item.total_value_services" />
      </template>

      <template #item.discount_value="{ item }">
        <ToLocaleString :value="item.discount_value" />
      </template>

      <template #item.apparatus_value="{ item }">
        <ToLocaleString :value="item.apparatus_value" />
      </template>
    </Table>
  </div>
</template>
