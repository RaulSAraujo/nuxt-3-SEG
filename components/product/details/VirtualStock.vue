<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const dayjs = useDayjs();
const { brDateWithTime } = useDateConversion();

if (product.value) {
  if (product.value.virtual_stock_temporary_at) {
    product.value.virtual_stock_temporary_at = brDateWithTime(
      `${product.value.virtual_stock_temporary_at}`
    );
  }

  if (product.value.virtual_stock_permanent_at) {
    product.value.virtual_stock_permanent_at = brDateWithTime(
      `${product.value.virtual_stock_permanent_at}`
    );
  }
}

watch(
  () => product.value!.virtual_stock_temporary,
  (newValue) => {
    if (newValue) {
      product.value!.virtual_stock_permanent = false;

      product.value!.virtual_stock_temporary_at = dayjs().format("DD/MM/YYYY HH:mm:ss");
    }
  }
);

watch(
  () => product.value!.virtual_stock_permanent,
  (newValue) => {
    if (newValue) {
      product.value!.virtual_stock_temporary = false;

      product.value!.virtual_stock_permanent_at = dayjs().format("DD/MM/YYYY HH:mm:ss");
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
        label="Virtual estoque temporário"
        :hide-details="true"
      />
    </v-col>
    <v-col>
      <TextField
        v-model="product!.virtual_stock_temporary_at"
        label="Data virtual estoque temporário"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
    <v-col>
      <Switch
        v-model="product!.virtual_stock_permanent"
        class="d-flex flex-row justify-center border-sm rounded-lg mx-1"
        label="VIRTUAL ESTOQUE PERMANENTE"
        :hide-details="true"
      />
    </v-col>
    <v-col>
      <TextField
        v-model="product!.virtual_stock_permanent_at"
        label="Data virtual estoque permanente"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
