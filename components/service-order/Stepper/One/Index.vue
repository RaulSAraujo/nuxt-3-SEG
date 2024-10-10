<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { os_supplier } = storeToRefs(serviceOrderStore);
</script>

<template>
  <v-card
    title="INFORMAÇÕES GERAIS"
    subtitle="Informações gerais da ordem de serviço."
    color="transparent"
    flat
  >
    <v-row dense class="pa-5">
      <v-col>
        <ServiceOrderStepperOneInputServiceMode />
      </v-col>
      <v-col>
        <ServiceOrderStepperOneInputErpType />
      </v-col>
      <v-col>
        <ServiceOrderStepperOneInputErpSituation />
      </v-col>
      <v-col>
        <TextField v-model="os_supplier" label="Os parceiro" />
      </v-col>
    </v-row>
  </v-card>
</template>
