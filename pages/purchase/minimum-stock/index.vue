<script setup lang="ts">
import type { Row } from "~/interfaces/MinimimStock.js";
useHead({
  titleTemplate: `Estoque mínimo - %s`,
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const updateFromResponse = (event: { result: Row[] }) => {
  const itemsFormat = items.value as Row[];

  const row = event.result[0];

  const find = useArrayFind(itemsFormat, (e) => e.id == row.id);

  if (find.value) {
    Object.entries(row).forEach(([key, value]) => {
      if (key in find.value!) {
        ((find.value as unknown) as Record<string, unknown>)[key] = value;
      }
    });
  }
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">ESTOQUE MÍNIMO</span>

    <Filter />

    <Table multi-sort>
      <template #item.status="{ item }">
        <MinimimStockTemplateStatus :status="item.status" />
      </template>

      <template #item.sales_average="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.sales_average ?? 0"
          attr="sales_average"
          :vw="10"
          @update-text="item.sales_average = $event"
          @response="updateFromResponse"
        />
      </template>

      <template #item.months="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.months ?? 0"
          attr="months"
          :vw="10"
          @update-text="item.months = $event"
          @response="updateFromResponse"
        />
      </template>
    </Table>
  </div>
</template>
