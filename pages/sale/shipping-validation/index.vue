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
        <TemplatesTags :tags="item.tags" />
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
          :text="item.freight_comment ?? ''"
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

      <template #item.date="{ item }">
        <DateString :date="item.Order.date" />
      </template>

      <template #item.sending_date="{ item }">
        <DateString :date="item.Order.sending_date" />
      </template>

      <template #item.status="{ item }">
        <Tooltip :text="item.Order.status" :vw="4" />
      </template>

      <template #item.marketplace_seller_name="{ item }">
        <Tooltip :text="item.Order.marketplace_seller_name" :vw="5" />
      </template>

      <template #item.shipment="{ item }">
        <Tooltip :text="item.Order.shipment" :vw="4" />
      </template>

      <template #item.shipment_integrator="{ item }">
        <Tooltip :text="item.Order.shipment_integrator" :vw="4" />
      </template>

      <template #item.point_sale="{ item }">
        <Tooltip :text="item.Order.point_sale" :vw="5" />
      </template>

      <template #item.invoice_number="{ item }">
        <span>{{ item.Order.invoice_number }}</span>
      </template>

      <template #item.company_name="{ item }">
        <Tooltip :text="item.Customer?.company_name ?? ''" :vw="5" />
      </template>

      <template #item.cpf="{ item }">
        <Tooltip :text="item.Customer?.cnpj || item.Customer?.cpf" :vw="5" />
      </template>

      <template #item.sending_code="{ item }">
        <Tooltip :text="item.Order?.sending_code" :vw="5" />
      </template>

      <template #item.seller="{ item }">
        <Tooltip :text="item.Order?.seller" :vw="5" />
      </template>

      <template #item.shipping_volume="{ item }">
        <span v-if="item.SalesOrders.length > 0">
          {{ item.SalesOrders[0].shipping_volume }}
        </span>
      </template>

      <template #item.email="{ item }">
        <Tooltip :text="item.Customer.email" :vw="5" />
      </template>

      <template #item.name="{ item }">
        <Tooltip :text="item.Customer.name" :vw="5" />
      </template>

      <template #item.total="{ item }">
        <ToLocaleString :value="item.Order.total" />
      </template>

      <template #item.delivery_time="{ item }">
        <span v-if="item.Order.delivery_time">{{ item.Order.delivery_time }}</span>
      </template>

      <template #item.shipment_value="{ item }">
        <span v-if="item.Order.shipment_value">{{ item.Order.shipment_value }}</span>
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
