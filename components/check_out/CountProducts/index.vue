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

const seller = computed(() => sellerMap.value[salesOrder.value!.id.length]);
</script>

<template>
  <v-dialog v-model="dialog" width="80vw" persistent no-click-animation>
    <v-toolbar
      :title="`${seller} - ${abbreviationPointSalerMap[salesOrder!.point_sale]}`"
      :color="mapColorSeller[seller]"
      rounded="t-xl"
      flat
      class="text-white text-center mb-1"
    />

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

<style>
.v-toolbar-title {
  font-size: xx-large;
  font-weight: bold;
}
</style>
