<script setup lang="ts">
const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);

const dayjs = useDayjs();

if (product.value) {
  if (product.value.updated_at && dayjs(product.value.updated_at).isValid()) {
    product.value.updated_at = dayjs(
      product.value!.updated_at,
      "YYYY-MM-DDTHH:mm:ss"
    ).format("DD/MM/YYYY HH:mm:ss");
  }

  if (product.value.created_at && dayjs(product.value.created_at).isValid()) {
    product.value.created_at = dayjs(
      product.value!.created_at,
      "YYYY-MM-DDTHH:mm:ss"
    ).format("DD/MM/YYYY HH:mm:ss");
  }
}
</script>

<template>
  <v-row dense>
    <v-col cols="6" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.id" label="REFERENCIA" :disabled="true" />
    </v-col>
    <v-col cols="6" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.type_id" label="ID TIPO" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.type" label="TIPO" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.quantity" label="QUANTIDADE" :disabled="true" />
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="2" xl="2">
      <TextField v-model="product!.ean_gs1" label="EAN GS1" :disabled="true" />
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
      <TextField v-model="product!.description" label="DESCRIÇÃO" />
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.created_at"
        label="CRIADO EM"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="2" xl="2">
      <TextField
        v-model="product!.updated_at"
        label="ATUALIZADO EM"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12">
      <TextArea
        v-model="product!.model"
        label="MODELOS"
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
        label="SINC. ECOM"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncedecom"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="SINCRONIZADO. ECOM"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncecominprogress"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="SINC./PROGRESSO"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.syncecomfailed"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="SINC. COM FALHA"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.image"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="IMAGEM"
        :hide-details="true"
        :readonly="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.sync_comclick"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="COMCLICK"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.sync_loja_do_tecnico"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="LOJA DO TECNICO"
        :hide-details="true"
        :disabled="product!.sync_viziotech"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <Switch
        v-model="product!.sync_viziotech"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="VIZIOTECH"
        :hide-details="true"
        @click="product!.sync_loja_do_tecnico = false"
      />
    </v-col>
  </v-row>
</template>
