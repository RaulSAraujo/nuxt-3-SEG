<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: bornDate, errorMessage: error } = useField<string | null | undefined>(
  "born_date"
);

watch(
  () => clientData.value.born_date,
  () => {
    bornDate.value = clientData.value.born_date;
  }
);
</script>

<template>
  <DatePicker
    v-model="clientData.born_date"
    label="Data nascimento"
    :multiple="false"
    :clearable="true"
    hide-details="auto"
    :error-messages="error"
    @save="bornDate = $dayjs($event).format('DD/MM/YYYY')"
  />
</template>
