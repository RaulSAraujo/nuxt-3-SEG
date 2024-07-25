<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.type"
        label="FAMILY/KIT"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.name"
        label="COD.FABRICANTE"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.produto_chave"
        label="COD.AUXILIAR"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.brand"
        label="MARCA"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.apparatus"
        label="APARELHO"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="12" md="12" lg="2" xl="2">
      <TextField
        v-model="product!.erp_category"
        label="CATEGORIA"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="12" md="12" lg="8" xl="8">
      <TextField
        v-model="product!.description"
        label="DESCRIÇÃO"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.ean"
        label="COD.EAN"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="12" md="12" lg="2" xl="2">
      <TextField
        v-model="product!.erp_color"
        label="COR"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col>
      <TextArea
        v-model="product!.model"
        label="MODELOS"
        rows="1"
        :auto-grow="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch
        :model-value="product!.ProductSell!.syncecom ?? false"
        label="SINC ECOM"
        :readonly="true"
        :hide-details="true"
      />
    </v-col>

    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch
        v-model="product!.active"
        label="ATIVO"
        :readonly="true"
        :hide-details="true"
      />
    </v-col>

    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch v-model="product!.image" label="IMAGEM" :hide-details="true" />
    </v-col>

    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch v-model="product!.support" label="SUPORTE" :hide-details="true" />
    </v-col>
  </v-row>
</template>
