<script setup lang="ts">
import type { PreferentialWarehouse } from "~/interfaces/Product.js";
import type { Row } from "~/interfaces/ErpWarehouses.js";

const props = defineProps<{
  preferentialWarehouse: PreferentialWarehouse | null;
  erpWarehouses: Row[];
}>();

const compPreferentialWarehouse = computed(() => props.preferentialWarehouse);
</script>

<template>
  <v-row v-if="compPreferentialWarehouse" dense class="my-3 mx-2">
    <v-col>
      <TextField
        v-model="compPreferentialWarehouse.almox"
        label="Código"
        :disabled="true"
      />
    </v-col>
    <v-col>
      <Select
        v-model="compPreferentialWarehouse.almox"
        label="Almoxarifado"
        :items="erpWarehouses"
        item-title="descricao"
        item-value="codigo"
        :multiple="false"
        disabled
      />
    </v-col>
    <v-col>
      <TextField
        v-model="compPreferentialWarehouse.estatual"
        label="Estoque"
        :disabled="true"
      />
    </v-col>
    <v-col>
      <TextField
        v-model="compPreferentialWarehouse.localizacao"
        label="Localização"
        :disabled="true"
      />
    </v-col>
  </v-row>
  <v-row v-else justify="center" class="py-6">
    <span>Este produto não possui armazém Preferencial.</span>
  </v-row>
</template>
