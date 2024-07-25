<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const dayjs = useDayjs();

product.value!.virtual_stock_temporary_at = !dayjs(
  product.value!.virtual_stock_temporary_at,
  "DD/MM/YYYY HH:mm:ss"
).isValid()
  ? dayjs(product.value!.virtual_stock_temporary_at, "YYYY-MM-DDTHH:mm:ss").format(
      "DD/MM/YYYY HH:mm:ss"
    )
  : product.value!.virtual_stock_temporary_at;

watch(
  () => product.value!.virtual_stock_temporary,
  (newValue) => {
    if (newValue) {
      product.value!.virtual_stock_temporary_at = dayjs().format("DD/MM/YYYY HH:mm:ss");
    } else {
      product.value!.virtual_stock_temporary_at = null;
    }
  }
);
</script>

<template>
  <v-row dense>
    <v-col>
      <Switch
        v-model="product!.virtual_stock_temporary"
        class="d-flex flex-row justify-center border-sm rounded-lg mx-1"
        label="VIRTUAL ESTOQUE TEMPORÁRIO"
        :hide-details="true"
      />
    </v-col>
    <v-col>
      <TextField
        v-model="product!.virtual_stock_temporary_at"
        label="DATA VIRTUAL ESTOQUE TEMPORÁRIO"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
