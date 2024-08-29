<script setup lang="ts">
const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);

const { brDateWithTime } = useDateConversion();

if (product.value) {
  product.value.updated_at = brDateWithTime(product.value.updated_at!.toString());
  product.value.created_at = brDateWithTime(product.value.created_at!.toString());
}
</script>

<template>
  <v-row dense>
    <v-col cols="6" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.id" label="Referencia" :disabled="true" />
    </v-col>
    <v-col cols="6" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.type_id" label="Id tipo" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.type" label="Tipo" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.quantity" label="Quantidade" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.ean_gs1" label="Ean gs1" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <Switch
        v-model="product!.active"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="ATIVO"
        :readonly="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="8" xl="8">
      <TextField v-model="product!.description" label="Descrição" />
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.created_at"
        label="Criado em"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.updated_at"
        label="Atualizado em"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12">
      <TextArea
        v-model="product!.model"
        label="Modelos"
        rows="1"
        :auto-grow="true"
        :hide-details="true"
        :disabled="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncecom"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Sinc. ecom"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncedecom"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Sincronizado ecom"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncecominprogress"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Sinc. progresso"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncecomfailed"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Sinc. com falha"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.image"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Imagem"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.sync_comclick"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Comclick"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.sync_loja_do_tecnico"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Loja do técnico"
        :hide-details="true"
        :disabled="product!.sync_viziotech"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.sync_viziotech"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Viziotech"
        :hide-details="true"
        @click="product!.sync_loja_do_tecnico = false"
      />
    </v-col>
  </v-row>
</template>
