<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: complement, errorMessage: error } = useField<string | undefined>(
  "complement"
);

watch(
  () => addressData.value.complement,
  () => {
    complement.value = addressData.value.complement;
  }
);
</script>

<template>
  <TextField
    v-model="addressData.complement"
    label="Complemento"
    :hide-details="true"
    :error-messages="error"
  />
</template>
