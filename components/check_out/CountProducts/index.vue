<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const {
  dialog,
  salesOrder,
  sellerMap,
  abbreviationPointSalerMap,
  mapColorSeller,
  box,
} = storeToRefs(checkOutStore);

const seller = computed(
  () =>
    salesOrder.value?.MarketplaceOrder[0]?.MarketplaceOrder.marketplace_seller_name ||
    sellerMap.value[salesOrder.value!.id.length]
);
</script>

<template>
  <v-dialog v-model="dialog" width="80vw" persistent no-click-animation>
    <v-toolbar
      :color="mapColorSeller[seller]"
      rounded="t-xl"
      flat
      extended
      extension-height="20"
      class="text-white text-center mb-1"
    >
      <template #default>
        <div class="ma-auto py-2">
          <span class="text-h2 font-weight-bold">
            {{ seller }} - {{abbreviationPointSalerMap[salesOrder!.point_sale]}}
          </span>
        </div>
      </template>
    </v-toolbar>

    <v-card
      title="CONTAGEM DOS PRODUTOS"
      :subtitle="`PED.${salesOrder!.id}`"
      rounded="lg"
    >
      <template #append>
        <span>SUGESTÃO DE CAIXA:</span>

        <span class="text-blue text-h6 text-decoration-underline ml-2">
          {{ box.toUpperCase() }}
        </span>

        <v-btn icon="mdi-close" variant="plain" color="red" @click="dialog = false" />
      </template>

      <template #text>
        <CheckOutCountProductsList />
      </template>
    </v-card>

    <CheckOutCountProductsInput />
  </v-dialog>
</template>

<style scoped></style>
