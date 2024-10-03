<script lang="ts" setup>
useHead({
  titleTemplate: `Historico da checkout - %s`,
});
</script>

<template>
  <div class="mt-5">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para checkout"
        :to="{
          name: 'expedition-check-out',
        }"
      />
    </div>

    <span class="ml-5 text-h6 text-primary font-weight-black">HISTORICO</span>

    <Filter hide-excel>
      <template #menu>
        <CheckOutUserAnalysis />
      </template>
    </Filter>

    <Table multi-sort>
      <template #item.actions="{ item }">
        <CheckOutTemplatePrintLabel
          :sale-id="item.sale_id"
          :point-sale="item.poin_sale"
          :seller="item.seller"
          :shipment-mode="item.shipment_mode"
          :tags="item.tag_id"
        />

        <CheckOutTemplatePrintInvoice :sale-id="item.sale_id" />
      </template>

      <template #item.tag_id="{ item }">
        <CheckOutTemplateTags :tags="item.tag_id ?? []" />
      </template>

      <template #item.finalized_freight_invoice="{ item }">
        <ToLocaleString :value="item.finalized_freight_invoice" />
      </template>

      <template #item.freight_invoice="{ item }">
        <ToLocaleString :value="item.freight_invoice" />
      </template>

      <template #item.freight_quotation="{ item }">
        <ToLocaleString :value="item.freight_quotation" />
      </template>

      <template #item.freight_value_validation="{ item }">
        <ToLocaleString :value="item.freight_value_validation" />
      </template>

      <template #item.sale_id="{ item }">
        <CheckOutTemplateTray :sale-id="`${item.sale_id}`" :poin-sale="item.poin_sale" />
      </template>
    </Table>

    <CheckOutCountProducts />
  </div>
</template>
