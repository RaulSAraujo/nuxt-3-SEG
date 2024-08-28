<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.type"
        label="Familia ou kit"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.name"
        label="Código de fabricante"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.produto_chave"
        label="Código auxiliar"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.brand"
        label="Marca"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.apparatus"
        label="Aparelho"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="12" md="12" lg="2" xl="2">
      <TextField
        v-model="product!.erp_category"
        label="Categoria"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="12" md="12" lg="8" xl="8">
      <TextField
        v-model="product!.description"
        label="Descrição"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField
        v-model="product!.ean"
        label="Codigo ean"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="12" md="12" lg="2" xl="2">
      <TextField
        v-model="product!.erp_color"
        label="Cor"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col>
      <TextArea
        v-model="product!.model"
        label="Modelos"
        rows="1"
        :auto-grow="true"
        :hide-details="true"
        @update:model-value="product!.model = $event.toUpperCase()"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch
        :model-value="product!.ProductSell!.syncecom ?? false"
        label="Sincronizado ecom"
        :readonly="true"
        :hide-details="true"
      />
    </v-col>

    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch
        v-model="product!.active"
        label="Ativo"
        :readonly="true"
        :hide-details="true"
      />
    </v-col>

    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch v-model="product!.image" label="Imagem" :hide-details="true" />
    </v-col>

    <v-col class="d-flex flex-row justify-center border-sm rounded-lg mx-1">
      <Switch v-model="product!.support" label="Suporte" :hide-details="true" />
    </v-col>
  </v-row>
</template>
