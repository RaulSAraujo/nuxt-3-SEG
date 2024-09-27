<script setup lang="ts">
useHead({
  titleTemplate: `Solicitação de compra - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">SOLICITAÇÃO DE COMPRA</span>

    <Filter>
      <template #button-create>
        <v-btn
          class="mr-2"
          color="primary"
          text="CRIAR"
          :to="{
            name: 'purchase-request-creation',
          }"
        />
      </template>
    </Filter>

    <Table show-select multi-sort>
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.reservation="{ item }">
        <Tooltip
          v-if="!item.reservation.includes('ID')"
          :text="item.reservation"
          :vw="5"
        />

        <PurchaseRequestTemplateTray v-else :sale-id="item.reservation" />
      </template>

      <template #item.cost="{ item }">
        <ToLocaleString :value="item.cost" />
      </template>

      <template #item.status="{ item }">
        <PurchaseRequestTemplateStatus
          :id="item.id"
          :status="item.status"
          @update-text="item.status = $event"
        />
      </template>

      <template #item.sending_limit_at="{ item }">
        <EditDialogDate
          :id="item.id"
          :date="item.sending_limit_at ?? ''"
          attr="sending_limit_at"
          :clearable="true"
          @update-text="item.sending_limit_at = $event"
        />
      </template>

      <template #item.observation="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.observation ?? ''"
          :vw="5"
          attr="observation"
          @update-text="item.observation = $event"
        />
      </template>

      <template #selection-text>
        <span> | </span>
        <PurchaseRequestTotalItems />
        <span> | </span>
        <PurchaseRequestTotalCost />
      </template>
    </Table>
  </div>
</template>
