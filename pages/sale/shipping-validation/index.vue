<script setup lang="ts">
useHead({
  titleTemplate: `Validação de envio - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">VALIDAÇÃO DE ENVIO</span>

    <Filter>
      <template #menu>
        <ShippingValidationMenuImportInvoice />
      </template>
    </Filter>

    <Table show-select multi-sort>
      <template #item.shipping_validated="{ item }">
        <CheckIcon
          :id="item.id"
          :enable-alert="true"
          :value="item.shipping_validated"
          attr="shipping_validated"
          @update-value="item.shipping_validated = $event"
        />
      </template>

      <template #item.tags="{ item }">
        <ShippingValidationTemplateTags :tags="item.tags" />
      </template>

      <template #item.status="{ item }">
        <span>{{ item.Order.status }}</span>
      </template>

      <template #item.actual_freight_price="{ item }">
        <ToLocaleString :value="item.actual_freight_price" />
      </template>

      <template #item.bill_freight_price="{ item }">
        <EditDialogCurrency
          :id="item.id"
          :value="item.bill_freight_price"
          attr="bill_freight_price"
          :vw="5"
          @update-text="item.bill_freight_price = $event"
        />
      </template>

      <template #item.customer_freight_price="{ item }">
        <ToLocaleString :value="item.customer_freight_price" />
      </template>

      <template #item.freight_diff_price="{ item }">
        <ToLocaleString :value="item.freight_diff_price" />
      </template>

      <template #item.freight_comment="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.freight_comment"
          attr="freight_comment"
          :vw="5"
          @update-text="item.freight_comment = $event"
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

      <template #selection-text>
        <span> | </span>
        <ShippingValidationDiffFreight />
        <span> | </span>
        <ShippingValidationTotalInvoice />
      </template>
    </Table>
  </div>
</template>
