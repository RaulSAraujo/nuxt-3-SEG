<script setup lang="ts">
const productStore = useProductStore();
const { product, productMeasurementsChanged } = storeToRefs(productStore);

watch(
  () => [
    product.value!.package_id,
    product.value!.height,
    product.value!.width,
    product.value!.length,
    product.value!.weight,
    product.value!.gross_weight,
    product.value!.weight_cubic,
  ],
  () => {
    productMeasurementsChanged.value = true;
  }
);
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsIdPackage />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField v-model="product!.weight" label="PESO LIQUIDO (GRAMAS)" />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsPackageWeight />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsGrossWeight />
    </v-col>
  </v-row>

  <v-row dense class="mt-n5">
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <ProductDetailsInputsWeightCubic />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.height"
        label="ALTURA (CM)"
        :disabled="product!.package_id != 1"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.width"
        label="LARGURA (CM)"
        :disabled="product!.package_id != 1"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.length"
        label="COMPRIMENTO (CM)"
        :disabled="product!.package_id != 1"
      />
    </v-col>
  </v-row>
</template>
