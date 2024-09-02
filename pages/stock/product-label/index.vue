<script setup lang="ts">
useHead({
  titleTemplate: `Etiqueta de produto - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">ETIQUETA DE PRODUTO</span>

    <Filter :hide-excel="true">
      <template #button-create>
        <v-btn
          class="mr-2"
          color="primary"
          text="CRIAR"
          :to="{
            name: 'stock-product-label-creation',
          }"
        />
      </template>
    </Filter>

    <Table :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <ProductLabelTemplateTagRemove
          :id="item.id"
          :ecom-order-id="item.ecom_order_id"
        />

        <Delete :id="item.id" />
      </template>

      <template #item.print="{ item }">
        <ProductLabelTemplatePrint :id="item.id" />
      </template>

      <template #item.description="{ item }">
        <Tooltip :text="item.Product.description" :vw="8" />
      </template>
    </Table>
  </div>
</template>
