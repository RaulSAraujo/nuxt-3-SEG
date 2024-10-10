<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { situation, status } = storeToRefs(serviceOrderStore);
</script>

<template>
  <Combobox
    v-if="situation"
    v-model="status"
    label="Situação"
    :items="situation"
    item-title="DESCRSITUACAOOS"
    item-value="SITUACAOOS"
  />
</template>
