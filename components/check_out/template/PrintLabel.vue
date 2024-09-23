<script setup lang="ts">
const props = defineProps<{
  saleId: number;
}>();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

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

    $toast().error(`${res.sale_tag}`);

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
