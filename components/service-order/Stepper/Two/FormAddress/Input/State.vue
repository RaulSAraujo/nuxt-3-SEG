<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { addressData } = storeToRefs(serviceOrderStore);

const { value: state, errorMessage: error } = useField<string>("state");

watch(
  () => addressData.value.state,
  () => {
    state.value = addressData.value.state;
  }
);
</script>

<template>
  <TextField
    v-model="addressData.state"
    v-maska="'AA'"
    label="Uf"
    hide-details="auto"
    :error-messages="error"
  />
</template>
