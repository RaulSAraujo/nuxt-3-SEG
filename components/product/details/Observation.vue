<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
</script>

<template>
  <v-row>
    <v-col>
      <TextField v-model="product!.observation" label="OBSERVAÇÃO" :hide-details="true" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <TextField
        v-model="product!.observation_cod_fab"
        label="OBSERVAÇÃO COD.FABRICANTE"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
