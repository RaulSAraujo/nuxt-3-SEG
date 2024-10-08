<script setup lang="ts">
useHead({
  titleTemplate: `Pedidos mercado livre - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">PEDIDOS MERCADO LIVRE</span>

    <Filter>
      <template #button-create>
        <OrderMlCreation />
      </template>
    </Filter>

    <Table show-select multi-sort>
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.status="{ item }">
        <OrderMlTemplateStatus
          :id="item.id"
          :status-current="item.status"
          @update-text="item.status = $event"
        />
      </template>

      <template #item.unit_cost="{ item }">
        <ToLocaleString :value="item.unit_cost" />
      </template>

      <template #item.total_cost="{ item }">
        <ToLocaleString :value="item.total_cost" />
      </template>

      <template #item.refund_date="{ item }">
        <EditDialogDate
          :id="item.id"
          :date="item.refund_date"
          attr="refund_date"
          :clearable="true"
          @update-text="item.refund_date = $event"
        />
      </template>

      <template #item.review_data="{ item }">
        <EditDialogDate
          :id="item.id"
          :date="item.review_data"
          attr="review_data"
          :clearable="true"
          @update-text="item.review_data = $event"
        />
      </template>
    </Table>
  </div>
</template>
