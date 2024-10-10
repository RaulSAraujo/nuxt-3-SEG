<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: identityNumber, errorMessage: error } = useField<string | undefined>(
  "identity_number"
);

watch(
  () => clientData.value.identity_number,
  () => {
    identityNumber.value = clientData.value.identity_number;
  }
);
</script>

<template>
  <TextField
    v-model="clientData.identity_number"
    v-maska="!clientData.type ? '##.###.###-##' : '##.###.###-X'"
    label="Rg/ie"
    hide-details="auto"
    :placeholder="!clientData.type ? '__.___.___-__' : '__.___.___-_'"
    :disabled="clientData.type != false && clientData.type != true"
    :error-messages="error"
  />
</template>
