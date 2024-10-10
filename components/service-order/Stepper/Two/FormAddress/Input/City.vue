<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: city, errorMessage: error } = useField<string>("city");

watch(
  () => addressData.value.city,
  () => {
    city.value = addressData.value.city;
  }
);
</script>

<template>
  <TextField
    v-model="addressData.city"
    label="Cidade"
    append-inner-icon="mdi-city"
    hide-details="auto"
    :error-messages="error"
  />
</template>
