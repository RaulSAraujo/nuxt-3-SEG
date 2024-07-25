<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const update = async () => {
  if (!product.value) return;

  try {
    useNuxtApp().$customFetch("product", {
      method: "PUT",
      body: {
        id: product.value.Quotations![0].product_id,
        icms_percentage: product.value.icms_percentage,
        diff_icms_percentage: product.value.diff_icms_percentage,
        ipi_percentage: product.value.ipi_percentage,
        icms_st_percentage: product.value.icms_st_percentage,
        freight: product.value.freight,
        others_cost: product.value.others_cost,
        icms: product.value.icms,
        diff_icms: product.value.diff_icms,
        icms_st: product.value.icms_st,
        ipi: product.value.ipi,
      },
    });

    $toast().success("Sucesso em salvar o fiscal.");
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }
};
</script>

<template>
  <div class="d-flex flex-rows my-5">
    <p class="text-h5 font-weight-bold mb-5">PERCENTUAIS FISCAIS / VALORES FISCAIS</p>

    <v-spacer />

    <v-btn color="white" @click="update"> SALVAR </v-btn>
  </div>

  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.icms_percentage"
        label="ICMS PERCENTUAL"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.diff_icms_percentage"
        label="DIFERENCIAL ICMS PERCENTUAL"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.ipi_percentage"
        label="IPI PERCENTAGEM"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <TextField
        v-model="product!.icms_st_percentage"
        label="ICMS ST PERCENTAGE"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <TextField v-model="product!.freight" label="FRETE" :hide-details="true" />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.others_cost"
        label="OUTROS CUSTOS"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.icms"
        label="ICMS"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.diff_icms"
        label="DIFF_ICMS"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.icms_st"
        label="ICMS_ST"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.ipi"
        label="IPI"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
