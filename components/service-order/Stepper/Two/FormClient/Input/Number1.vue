<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: number, errorMessage: error } = useField<string>("number1");

watch(
  () => clientData.value.number1,
  () => {
    number.value = clientData.value.number1;
  }
);
</script>

<template>
  <ClientTelephone
    v-model="clientData.number1"
    v-maska="'(##) #####-####'"
    label="Telefone 1 (Whatsapp)"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :hint="clientData.identifier_number1"
    :error-messages="error"
    @update-text="clientData.identifier_number1 = $event"
  />
</template>
