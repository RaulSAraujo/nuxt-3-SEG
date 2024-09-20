<script setup lang="ts">
useHead({
  titleTemplate: `Checkout - %s`,
});

const { data } = useAuthState();
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">CHECKOUT</span>

    <v-container fluid>
      <ClientOnly>
        <CheckOutStatus />
      </ClientOnly>

      <CheckOutDetailsSales />
    </v-container>

    <Table
      multi-sort
      :others-params="{
        user: data?.name,
        created_at: $dayjs().format('YYYY-MM-DD'),
      }"
    >
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
    </Table>

    <CheckOutCountProducts />
  </div>
</template>
