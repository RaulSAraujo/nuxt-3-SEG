<script setup lang="ts">
useHead({
  titleTemplate: `Insumos - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">INSUMOS</span>

    <Filter>
      <template #button-create>
        <InsumosCreation />
      </template>
    </Filter>

    <Table multi-sort>
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.unit_cost="{ item }">
        <ToLocaleString :value="item.unit_cost" />
      </template>

      <template #item.total_cost="{ item }">
        <EditDialogCurrency
          :id="item.id"
          :value="item.total_cost"
          attr="total_cost"
          :vw="5"
          @update-text="item.total_cost = $event"
        />
      </template>

      <template #item.quantity_purchase="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.quantity_purchase"
          attr="quantity_purchase"
          :vw="5"
          @update-text="item.quantity_purchase = $event"
        />
      </template>

      <template #item.supplier="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.supplier"
          attr="supplier"
          :vw="5"
          @update-text="item.supplier = $event"
        />
      </template>

      <template #item.observation="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.observation"
          attr="observation"
          :vw="5"
          @update-text="item.observation = $event"
        />
      </template>
    </Table>
  </div>
</template>
