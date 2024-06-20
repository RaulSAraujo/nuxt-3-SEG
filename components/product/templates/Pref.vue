<script setup>
defineProps({
  item: { type: Object, default: {} },
});
</script>

<template>
  <div class="d-flex flex-row justify-center align-center">
    <div v-if="item.Family.product_id == item.id">
      <v-tooltip
        location="bottom"
        text="Pref.Venda"
        style="
          --v-theme-surface-variant: 49, 191, 58;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props }">
          <v-img v-bind="props" width="15px" src="/icons/disp1.gif" />
        </template>
      </v-tooltip>
    </div>
    <div v-if="item.Family.buy_preference_id == item.id">
      <v-tooltip
        location="bottom"
        text="Pref.Compra"
        style="
          --v-theme-surface-variant: 46, 94, 71;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props }">
          <v-img v-bind="props" class="mt-n4" width="15px" src="/icons/pref-compra.gif" />
        </template>
      </v-tooltip>
    </div>
  </div>
</template>