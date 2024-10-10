<script lang="ts" setup>
import type { ERPType } from "~/interfaces/ServiceOrder";

const { data, status } = $api<ERPType[]>("service-order/erp-type");

const serviceOrderStore = useServiceOrderStore();
const { type } = storeToRefs(serviceOrderStore);


</script>

<template>
  <Select
    v-if="status == 'success' && data"
    v-model="type"
    label="Tipo de atendimento"
    :items="data"
    item-title="DESCRTIPOOS"
    item-value="TIPOOS"
  />
</template>
