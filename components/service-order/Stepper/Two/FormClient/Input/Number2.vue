<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: number, errorMessage: error } = useField<string | undefined>("number2");

watch(
  () => clientData.value.number2,
  () => {
    number.value = clientData.value.number2;
  }
);
</script>

<template>
  <ClientTelephone
    v-model="clientData.number2"
    v-maska="'(##) #####-####'"
    label="Telefone 2"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :hint="clientData.identifier_number2"
    :error-messages="error"
    @update-text="clientData.identifier_number2 = $event"
  />
</template>
