<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: observation, errorMessage: error } = useField<string | undefined>(
  "observation"
);

watch(
  () => addressData.value.observation,
  () => {
    observation.value = addressData.value.observation;
  }
);
</script>

<template>
  <TextArea
    v-model="addressData.observation"
    label="Observações do cliente"
    :hide-details="true"
    :error-messages="error"
  />
</template>
