<script setup lang="ts">
import type { TagID } from "~/interfaces/SalesOrder.js";
const props = defineProps<{
  saleId: number | string;
  seller: string;
  poinSale: string;
  shipmentMode: string;
  tags: TagID[];
}>();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const checkOutStore = useCheckOutStore();
const { statusForTemporaryTag } = storeToRefs(checkOutStore);

const { capitalizeFirstLetter } = useCapitalize();

const printer = async () => {
  loading.value = true;

  interface SalesOrderTag {
    sale_tag: string;
    nameShipping: string;
    nfKey: string;
    shipping_volume: string;
  }

  try {
    const res = await $customFetch<SalesOrderTag>("sales-order/tag", {
      params: {
        id: props.saleId,
        nf: false,
        tag: true,
      },
    });

    $toast().success(`${res.sale_tag}`);

    if (statusForTemporaryTag.value.includes(res.sale_tag)) {
      const stringTags = props.tags.map((item) => item.id).join(",");
      const stringFab = props.tags.map((item) => item.name).join(",");

      await $customFetch("sales-order/tag-temporary", {
        method: "POST",
        body: {
          id: props.saleId,
          seller: props.seller,
          point_sale: props.poinSale,
          shipment: props.shipmentMode,
          stringTags,
          stringFab,
          firstTag: {
            id_tag: props.tags[0].id,
            erp_product_id: props.tags[0].erp_product_id,
            name: props.tags[0].name,
            produto_chave: props.tags[0].produto_chave,
          },
        },
      });
    }

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="GERAR ETIQUETA"
    style="
      --v-theme-surface-variant: 33, 150, 243;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-printer"
        variant="plain"
        size="small"
        color="blue"
        density="comfortable"
        :loading="loading"
        @click="printer"
      />
    </template>
  </v-tooltip>
</template>
