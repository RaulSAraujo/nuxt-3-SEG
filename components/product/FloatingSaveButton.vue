<script setup lang="ts">
const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const productStore = useProductStore();
const { product, productMeasurementsChanged } = storeToRefs(productStore);

const loading = useLoadingIndicator();

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

const removeStatus = () => {
  const pstatuses = product.value!.Pstatuses!.map((item) => item.id);

  const index = pstatuses.findIndex((item) => item === 3);

  pstatuses.splice(index, 1);

  save(pstatuses);
};

const addStatus = () => {
  const pstatuses = product.value!.Pstatuses!.map((item) => item.id);

  pstatuses.push(3);

  save(pstatuses);
};

const { databaseDateWithTime } = useDateConversion();

const save = async (pstatuses?: number[]) => {
  snackbar.value = false;

  loading.start();

  const details = { ...product.value };

  delete details.Family;
  delete details.PAvailabilityHistories;
  delete details.Package;
  delete details.ProductSell;
  delete details.Quotations;
  delete details.Pstatuses;
  delete details.SupplierPreference;
  delete details.TablePrice;

  if (productMeasurementsChanged) {
    details.weight = (parseFloat(`${details.weight}`) / 1000 || 0).toFixed(3);
    details.gross_weight = (parseFloat(`${details.gross_weight}`) / 1000 || 0).toFixed(3);
    details.weight_cubic = (parseFloat(`${details.weight_cubic}`) / 1000 || 0).toFixed(3);
    details.height = parseFloat(`${details.height || 0}`).toFixed(2);
    details.width = parseFloat(`${details.width || 0}`).toFixed(2);
    details.length = parseFloat(`${details.length || 0}`).toFixed(2);
  } else {
    delete details.package_id;
    delete details.weight;
    delete details.gross_weight;
    delete details.weight_cubic;
    delete details.height;
    delete details.width;
    delete details.length;
  }

  if (details.virtual_stock_temporary_at) {
    details.virtual_stock_temporary_at = databaseDateWithTime(
      `${details.virtual_stock_temporary_at}`
    );
  }

  if (details.virtual_stock_permanent_at) {
    details.virtual_stock_permanent_at = databaseDateWithTime(
      `${details.virtual_stock_permanent_at}`
    );
  }

  try {
    await useNuxtApp().$customFetch("product", {
      method: "PUT",
      body: {
        ...details,
        pstatuses,
      },
    });

    $toast().success("Sucesso em atualizar.");

    productMeasurementsChanged.value = false;
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }

  loading.finish();
};
</script>

<template>
  <ClientOnly>
    <v-fab
      v-if="$router.currentRoute.value.name === 'register-product-id'"
      icon="mdi-content-save"
      color="primary"
      style="position: fixed; bottom: 105px; right: 60px"
      @click="productMeasurementsChanged ? (snackbar = true) : save()"
    />

    <v-snackbar
      v-model="snackbar"
      rounded="lg"
      variant="flat"
      timeout="6000"
      :timer="`${currentTime}`"
      color="primary"
      location="top"
      content-class="border-thin"
    >
      <div class="text-subtitle-1">Dimensões reais do produto ?</div>

      <template #actions>
        <v-btn color="white" variant="plain" @click="addStatus()"> Não </v-btn>

        <v-btn color="white" variant="plain" @click="removeStatus()"> Sim </v-btn>
      </template>
    </v-snackbar>
  </ClientOnly>
</template>
