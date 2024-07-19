<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const { availabilityMap } = useProductStore();
</script>

<template>
  <v-row dense class="mt-2">
    <v-col cols="12" sm="4" md="6" lg="2" xl="2">
      <Select
        v-model="product!.availability"
        label="DISPONIBILIDADE"
        :items="availabilityMap"
        item-title="title"
        item-value="value"
        :multiple="false"
        :disabled="true"
      />
    </v-col>
    <v-col cols="12" sm="2" md="2" lg="2" xl="2">
      <TextField
        v-model="product!.quantity"
        label="ESTOQUE"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="3" md="2" lg="2" xl="2">
      <TextField
        v-model="product!.virtual_quantity"
        label="ESTOQUE VIRTUAL"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="3" md="2" lg="2" xl="2">
      <TextField v-model="product!.lead_time" label="LEAD TIME" :hide-details="true" />
    </v-col>
    <v-col cols="12" sm="4" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.quantity_purchased"
        label="QUANTIDADE COMPRADA"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.warranty_days"
        label="DIAS GARANTIA"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
