<script setup lang="ts">
const productStore = useProductStore();
const { product, availabilityMap } = storeToRefs(productStore);
</script>

<template>
  <v-row v-if="product?.Quotations" dense class="mx-auto">
    <v-col cols="12" sm="6" md="4" lg="3" xl="3">
      <TextField
        v-model="product.Quotations[0].Supplier.name"
        outlined
        label="FORNECEDOR PREFERENCIAL"
        disabled
        dense
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="2" xl="2">
      <CurrencyField
        v-model="product.Quotations[0].cost"
        label="CUSTO (FORNECEDOR PREF.)"
        :hide-details="true"
        :disabled="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="2" xl="2">
      <CurrencyField
        v-model="product.cost"
        label="CUSTO (PRODUTO)"
        :hide-details="true"
        :disabled="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="2" xl="2">
      <TextField
        v-model="product.Family.quantity"
        label="QUANTIDADE MINIMA COMPRA"
        :disabled="true"
      />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="3" xl="3">
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
  </v-row>
</template>
