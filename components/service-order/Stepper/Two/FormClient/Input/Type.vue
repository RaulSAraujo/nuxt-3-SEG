<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { clientData } = storeToRefs(serviceOrderStore);

const { value: type, errorMessage: error } = useField<boolean>("type");

watch(type, () => {
  clientData.value.type = type.value;
});
</script>

<template>
  <div class="d-flex align-center">
    <v-icon icon="mdi-clipboard-account" class="mr-2" />

    <span :class="!!error ? 'text-error' : 'text-grey'">Cliente: </span>

    <v-radio-group
      v-model="type"
      inline
      hide-details
      :error="!!error"
      :error-messages="error"
    >
      <v-radio label="Fisico" color="primary" :value="false" />
      <v-radio label="Juridico" color="primary" :value="true" />
    </v-radio-group>
  </div>
</template>
