<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: name, errorMessage: error } = useField<string>("name");

watch(
  () => clientData.value.name,
  () => {
    name.value = clientData.value.name;
  }
);
</script>

<template>
  <TextField
    v-model="clientData.name"
    label="Nome do cliente"
    hide-details="auto"
    :error-messages="error"
  />
</template>
