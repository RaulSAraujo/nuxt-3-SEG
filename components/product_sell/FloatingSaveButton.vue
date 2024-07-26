<script setup lang="ts">
const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);

const loading = useLoadingIndicator();

const save = async () => {
  loading.start();

  try {
    await useNuxtApp().$customFetch("product-sell", {
      method: "PUT",
      body: {
        id: product.value?.id,
        syncecom: product.value?.syncecom,
        description: product.value?.description,
        featured_seal: product.value?.featured_seal,
        release_seal: product.value?.release_seal,
        additional_seal: product.value?.additional_seal,
        sync_comclick: product.value?.sync_comclick,
        sync_loja_do_tecnico: product.value?.sync_loja_do_tecnico,
        sync_viziotech: product.value?.sync_viziotech,
      },
    });

    $toast().success("Sucesso em atualizar.");
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }

  loading.finish();
};
</script>

<template>
  <v-fab
    class="mb-4"
    icon="mdi-content-save"
    location="bottom end"
    color="primary"
    app
    appear
    @click="save()"
  />
</template>
