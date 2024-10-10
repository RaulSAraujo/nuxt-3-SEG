<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: number, errorMessage: error } = useField<string | undefined>("number");

watch(
  () => addressData.value.number,
  () => {
    number.value = addressData.value.number;
  }
);
</script>

<template>
  <TextField
    v-model="addressData.number"
    label="Número"
    append-inner-icon="mdi-numeric"
    :hide-details="true"
    :error-messages="error"
  />
</template>
