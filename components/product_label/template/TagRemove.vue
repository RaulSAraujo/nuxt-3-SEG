<script setup lang="ts">
import type { Row } from "~/interfaces/StockTagControl.js";

const props = defineProps<{
  id: number;
  ecomOrderId: number | null;
}>();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const removeTag = async () => {
  snackbar.value = false;

  loading.start();

  try {
    await useNuxtApp().$customFetch(`stock-tag-control?id=${props.id}`, {
      method: "PUT",
      body: {
        id: props.id,
        ecom_order_id: null,
        erp_order_id: null,
      },
    });

    $toast().success("Sucesso ao remover o vinculo da tag");

    loading.finish();

    const item = useArrayFind(items.value as Row[], (e: Row) => e.id == props.id);

    item.value!.ecom_order_id = null;
    item.value!.erp_order_id = null;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="Remover vinculo"
    style="
      --v-theme-surface-variant: 255, 87, 34;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-tag-minus"
        variant="plain"
        :color="!ecomOrderId ? 'grey' : 'deep-orange'"
        size="small"
        density="comfortable"
        :disabled="!ecomOrderId"
        @click="snackbar = true"
      />
    </template>
  </v-tooltip>

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Remover vinculo</div>

    <p class="text-caption text-grey-lighten-2">
      O pedido Nº{{ ecomOrderId }} perderá seu vinculo com o produto TAG.{{ id }} deseja
      continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="removeTag()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
