<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: cpfCnpj, errorMessage: error } = useField<string | undefined>("cpf_cnpj");

watch(
  () => clientData.value.cpf_cnpj,
  () => {
    cpfCnpj.value = clientData.value.cpf_cnpj;
  }
);
</script>

<template>
  <TextField
    v-model="clientData.cpf_cnpj"
    v-maska="!clientData.type ? '###.###.###-##' : '##.###.###/####-##'"
    label="Cpf/Cnpj"
    hide-details="auto"
    :placeholder="!clientData.type ? '___.___.___-__' : '__.___.___/____-__'"
    :disabled="clientData.type != false && clientData.type != true"
    :error-messages="error"
  />
</template>
