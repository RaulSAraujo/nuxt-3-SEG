<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: neighbourhood, errorMessage: error } = useField<string>("neighbourhood");

watch(
  () => addressData.value.neighbourhood,
  () => {
    neighbourhood.value = addressData.value.neighbourhood;
  }
);
</script>

<template>
  <TextField
    v-model="addressData.neighbourhood"
    label="Bairro"
    hide-details="auto"
    :error-messages="error"
  />
</template>
