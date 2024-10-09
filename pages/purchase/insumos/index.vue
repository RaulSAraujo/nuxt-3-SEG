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

      <template #item.status="{ item }">
        <InsumosTemplateStatus
          :id="item.id"
          :text="item.status"
          @update-status="item.status = $event"
          @update-purchased-by="item.purchased_by = $event"
          @update-purchase-date="item.purchase_date = $event"
          @update-received-date="item.received_date = $event"
        />
      </template>

      <template #item.unit_cost="{ item }">
        <ToLocaleString :value="item.unit_cost" />
      </template>

      <template #item.total_cost="{ item }">
        <InsumosTemplateTotalCost
          :id="item.id"
          :total-cost="item.total_cost"
          :quantity-purchase="item.quantity_purchase"
          @update-total-cost="item.total_cost = $event"
          @update-unit-cost="item.unit_cost = $event"
          @update-quantity-purchase="item.quantity_purchase = $event"
        />
      </template>

      <template #item.quantity_purchase="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.quantity_purchase"
          attr="quantity_purchase"
          :vw="5"
          :disabled="item.status === 'COMPRADO' || item.status === 'LIBERADO'"
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
