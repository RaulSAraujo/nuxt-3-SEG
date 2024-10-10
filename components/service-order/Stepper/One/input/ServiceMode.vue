<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { service_mode } = storeToRefs(serviceOrderStore);

const items = [
  { text: "BALCAO", value: 1 },
  { text: "IN HOME", value: 2 },
  { text: "VENDER", value: 13 },
  { text: "DESMONTAR", value: 14 },
];
</script>

<template>
  <Select
    v-model="service_mode"
    label="Atendimento"
    :items="items"
    item-title="text"
    item-value="value"
  />
</template>
