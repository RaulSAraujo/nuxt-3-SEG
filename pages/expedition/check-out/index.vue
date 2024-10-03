<script setup lang="ts">
useHead({
  titleTemplate: `Checkout - %s`,
});

const { data } = useAuthState();

const { brDateWithTime } = useDateConversion();
</script>

<template>
  <div class="mt-5">
    <v-row dense align="center" justify="space-between">
      <v-col cols="2">
        <span class="ml-5 text-h6 text-primary font-weight-black">CHECKOUT</span>
      </v-col>

      <v-col cols="7">
        <ClientOnly>
          <CheckOutStatus />

          <template #fallback>
            <v-row dense justify="space-between" align="center">
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
            </v-row>
          </template>
        </ClientOnly>
      </v-col>
    </v-row>

    <Filter hide-excel>
      <template #menu>
        <CheckOutUserAnalysis />

        <CheckOutUploadFiles />
      </template>

      <template #button-create>
        <div class="d-flex">
          <CheckOutInput />

          <CheckOutSwitch />
        </div>

        <v-spacer />
      </template>
    </Filter>

    <Table
      multi-sort
      :others-params="{
        user: data?.name,
        created_at: $dayjs().format('YYYY-MM-DD'),
      }"
    >
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

      <template #item.images="{ item }">
        <LazyCheckOutTemplateImages :sale-id="item.sale_id" />
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

      <template #item.created_at="{ item }">
        <span>{{ brDateWithTime(item.created_at) }}</span>
      </template>

      <template #item.sale_id="{ item }">
        <CheckOutTemplateTray :sale-id="`${item.sale_id}`" :poin-sale="item.poin_sale" />
      </template>
    </Table>

    <CheckOutCountProducts />
  </div>
</template>
