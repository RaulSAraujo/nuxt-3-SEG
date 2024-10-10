<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: email, errorMessage: error } = useField<string | undefined>("email");

watch(
  () => clientData.value.email,
  () => {
    email.value = clientData.value.email;
  }
);
</script>

<template>
  <TextField
    v-model="clientData.email"
    label="E-mail"
    hide-details="auto"
    append-inner-icon="mdi-email"
    :error-messages="error"
  />
</template>
