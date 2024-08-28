<script setup lang="ts">
const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const loading = useLoadingIndicator();

const { back } = useRouter();

const destroy = async () => {
  snackbar.value = false;
  loading.start();

  try {
    await useNuxtApp().$customFetch("product", {
      method: "DELETE",
      params: {
        id: product.value?.id,
      },
    });

    $toast().success("Produto deletado.");

    loading.finish();

    back();
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);

    loading.finish();
  }
};
</script>

<template>
  <ClientOnly>
    <v-fab
      v-if="$router.currentRoute.value.name === 'register-product-id'"
      class="mb-4"
      icon="mdi-delete"
      location="bottom end"
      color="primary"
      app
      appear
      @click="snackbar = true"
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
      <div class="text-subtitle-1">Deseja deletar esse produto ?</div>

      <template #actions>
        <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

        <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
      </template>
    </v-snackbar>
  </ClientOnly>
</template>
