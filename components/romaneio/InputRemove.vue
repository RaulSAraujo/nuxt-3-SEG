<script lang="ts" setup>
import type { Row } from "~/interfaces/SalesOrder.js";

const props = defineProps<{
  items: Row[];
}>();

const orders = ref("");

const computedItems = computed(() => props.items);

const remove = () => {
  const ids = orders.value.split(",");

  ids.forEach((id) => {
    const index = computedItems.value.findIndex((item) => {
      return id === `${item.sale_id}`;
    });

    if (index > -1) {
      computedItems.value.splice(index, 1);
    }
  });

  orders.value = "";
};
</script>

<template>
  <TextField
    v-model="orders"
    label="Pedidos não coletados"
    placeholder="Separe os pedidos por vírgula"
    append-inner-icon="mdi-delete"
    @click:append-inner="remove"
  />
</template>
