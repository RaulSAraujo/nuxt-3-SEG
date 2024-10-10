<script lang="ts" setup>
import type { ERPSituation } from "~/interfaces/ServiceOrder";

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
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para orderm de serviço"
        :to="{
          name: 'service-order',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-toolbar title="NOVA ORDEM DE SERVIÇO" rounded="t-xl" class="mb-5" />

      <ServiceOrderStepper />
    </v-sheet>
  </div>
</template>
