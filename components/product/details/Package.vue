<script setup lang="ts">
import type { Package, Row } from "~/interfaces/Package.js";

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const { status } = $api<Row[]>("package", {
  key: "PackageList",
  lazy: true,
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return ((fetchData as unknown) as Package).rows;
  },
});
</script>

<template>
  <v-row v-if="status === 'success'" dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsIdPackage />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.weight"
        v-maska="'N'"
        label="Peso liquido (g)"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsPackageWeight />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsGrossWeight />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsWeightCubic />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.height"
        label="Altura (cm)"
        :disabled="product!.package_id != 1"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.width"
        label="Largura (cm)"
        :disabled="product!.package_id != 1"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.length"
        label="Comprimento (cm)"
        :disabled="product!.package_id != 1"
      />
    </v-col>
  </v-row>
</template>
