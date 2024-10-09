<script lang="ts" setup>
import type { Row } from "~/interfaces/Insumos";
const props = defineProps<{
  id: number;
  totalCost: string | null;
  quantityPurchase: string | number;
}>();

const emit = defineEmits(["updateTotalCost", "updateUnitCost", "updateQuantityPurchase"]);

const { url } = useTableStore();

const update = async (value: string) => {
  interface Response {
    message: string;
    result: Row[];
    success: boolean;
  }

  const res = await useNuxtApp().$customFetch<Response>(url, {
    method: "PUT",
    body: {
      id: props.id,
      total_cost: value,
      quantity_purchase: props.quantityPurchase,
    },
  });

  emit("updateTotalCost", parseFloat(`${res.result[0].total_cost}`).toFixed(2));
  emit("updateUnitCost", parseFloat(`${res.result[0].unit_cost}`).toFixed(2));
  emit("updateQuantityPurchase", props.quantityPurchase);
};
</script>

<template>
  <EditDialogCurrency
    :id="id"
    :value="totalCost"
    attr="total_cost"
    :export-save="true"
    @export-save="update"
  />
</template>
