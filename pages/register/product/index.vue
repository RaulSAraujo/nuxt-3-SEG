<script setup lang="ts">
useHead({
  titleTemplate: `Produto compra - %s`,
});

const productStore = useProductStore();
const { product, costTableIndex } = storeToRefs(productStore);

const activateDialogToEdit = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">PRODUTO COMPRA</span>

    <Filter>
      <template #menu>
        <ProductMenuUpdateAll />

        <ProductMenuIntegration />
      </template>
    </Filter>

    <Table :show-select="true" :multi-sort="true" :router-full="true">
      <template #item.action="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          color="pink"
          :to="{
            name: 'register-product-id',
            params: { id: item.id },
          }"
          @click="product = item"
        />
      </template>

      <template #item.pref="{ item }">
        <ProductTemplatesPref
          :id="item.id"
          :product-id="item.Family.product_id"
          :buy-preference-id="item.Family.buy_preference_id"
        />
      </template>

      <template #item.availability="{ item }">
        <ProductTemplatesAvailability
          :availability="item.availability"
          :pavailability-histories="item.PAvailabilityHistories"
          @dblclick="
            product = item;
            costTableIndex = 0;
            activateDialogToEdit = true;
          "
        />
      </template>

      <template #item.pstatuses="{ item }">
        <ProductTemplatesStatus :pstatuses="item.Pstatuses" />
      </template>

      <template #item.name="{ item }">
        <ProductTemplatesName
          :name="item.name"
          :observation-cod-fab="item.observation_cod_fab"
        />
      </template>

      <template #item.erp_syncecom="{ item }">
        <CheckIcon :value="item.ProductSell?.erp_syncecom ?? false" :readonly="true" />
      </template>

      <template #item.syncedecom="{ item }">
        <CheckIcon :value="item.ProductSell?.syncedecom ?? false" :readonly="true" />
      </template>

      <template #item.syncecominprogress="{ item }">
        <CheckIcon
          :value="item.ProductSell?.syncecominprogress ?? false"
          :readonly="true"
        />
      </template>

      <template #item.syncecomfailed="{ item }">
        <CheckIcon :value="item.ProductSell?.syncecomfailed ?? false" :readonly="true" />
      </template>

      <template #item.quantity="{ item }">
        <span>
          {{ item.type === "KIT" ? item.ProductSell?.quantity ?? 0 : item.quantity }}
        </span>
      </template>

      <template #item.ProductSell.Ecommerces="{ item }">
        <ProductTemplatesEcommerces
          :erp-ecommerce-id="item.ProductSell.Ecommerces[0]?.erp_ecommerce_id ?? null"
          :ecom-product-id0="
            item.ProductSell.Ecommerces[0]?.EcommerceProductSell.ecom_product_id ?? null
          "
          :ecom-product-id1="
            item.ProductSell.Ecommerces[1]?.EcommerceProductSell.ecom_product_id ?? null
          "
        />
      </template>

      <template #item.price="{ item }">
        <ProductTemplatesPrice
          :price="item.price"
          :promotion-price="item.promotion_price"
          :promotion-starts-at="item.promotion_starts_at"
          :promotion-ends-at="item.promotion_ends_at"
        />
      </template>

      <template #item.cost="{ item }">
        <ProductTemplatesCost :cost="item.cost" :cost-at="item.cost_at" />
      </template>

      <template #item.gross_margin="{ item }">
        <ProductTemplatesGrossMargin :cost="item.cost" :price="item.price" />
      </template>

      <template #item.price_table_id="{ item }">
        <span>{{ item.TablePrice?.name }}</span>
      </template>

      <template #item.counter_price="{ item }">
        <ToLocaleString :value="item.counter_price" />
      </template>

      <template #item.promotion_price="{ item }">
        <ToLocaleString :value="item.promotion_price" />
      </template>

      <template #item.supplier_preference_id="{ item }">
        <span> {{ item.SupplierPreference?.name.toUpperCase() }} </span>
      </template>

      <template #item.package_id="{ item }">
        <span>{{ item.Package?.name }}</span>
      </template>

      <template #item.gross_weight="{ item }">
        <span>{{ Math.ceil(parseFloat(item.gross_weight ?? 0.0) * 1000) }}</span>
      </template>

      <template #item.weight="{ item }">
        <span>{{ Math.ceil(parseFloat(item.weight ?? 0.0) * 1000) }}</span>
      </template>

      <template #item.weight_cubic="{ item }">
        <span>{{ Math.ceil(parseFloat(item.weight_cubic ?? 0.0) * 1000) }}</span>
      </template>
    </Table>

    <ProductCostTableMyTableToEdit
      v-if="activateDialogToEdit"
      v-model="activateDialogToEdit"
      @disable="activateDialogToEdit = false"
    />
  </div>
</template>
