<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: street, errorMessage: error } = useField<string>("street");

watch(
  () => addressData.value.street,
  () => {
    street.value = addressData.value.street;
  }
);
</script>

<template>
  <TextField
    v-model="addressData.street"
    label="Rua"
    append-inner-icon="mdi-road"
    hide-details="auto"
    :error-messages="error"
  />
</template>
