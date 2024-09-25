<script setup lang="ts">
import type { SaleData, Order } from "~/interfaces/SaleData.js";

const props = defineProps<{
  saleId: string | number;
}>();

const { $customFetch } = useNuxtApp();

const dialog = ref(false);

const saleOrder = ref<Order>();

watch(
  () => dialog.value,
  async () => {
    if (dialog.value) {
      const saleRes = await $customFetch<SaleData>(
        `sales-order/sale-data?id=${props.saleId}`
      );

      saleOrder.value = saleRes.Order;
    } else {
      saleOrder.value = undefined;
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="32vw">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-image-outline"
        variant="plain"
        color="primary"
        density="compact"
      />
    </template>

    <template #default>
      <v-card v-if="saleOrder" rounded="xl" title="Imagens">
        <template #text>
          <v-card
            v-for="(item, index) in saleOrder.ProductsSold"
            :key="index"
            elevation="0"
          >
            <v-img
              :src="item.ProductsSold.ProductSoldImage[0].http"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              cover
              class="align-end ma-4 rounded-xl"
            >
              <v-card-title>{{ item.ProductsSold.name }}</v-card-title>
            </v-img>
          </v-card>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
::v-deep .v-avatar.v-avatar--size-default {
  --v-avatar-height: 150px;
}
</style>
