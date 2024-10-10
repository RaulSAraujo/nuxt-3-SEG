<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: gender, errorMessage: error } = useField<string | null>("gender");

watch(
  () => clientData.value.gender,
  () => {
    gender.value = clientData.value.gender;
  }
);
</script>

<template>
  <div class="d-flex align-center">
    <v-icon icon="mdi-gender-transgender" class="mr-2" />

    <span :class="!!error ? 'text-error' : 'text-grey'">Sexo: </span>

    <v-radio-group
      v-model="clientData.gender"
      inline
      hide-details
      :error="!!error"
      :error-messages="error"
    >
      <v-radio label="Masculino" color="primary" value="M" />
      <v-radio label="Feminino" color="primary" value="F" />
      <v-radio label="Outros" color="primary" value="O" />
    </v-radio-group>
  </div>
</template>
