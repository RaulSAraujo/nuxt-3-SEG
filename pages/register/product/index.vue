<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Produto compra - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "product";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = false;

</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter />

      <Table
        title="PRODUTO COMPRA"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action>
          <v-btn icon="mdi-pencil" variant="plain" size="small" color="pink" />
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
          <ProductTemplatesSyncEcom :synce-ecom="item.ProductSell.syncecom" />
        </template>

        <template #item.syncedecom="{ item }">
          <ProductTemplatesSyncedEcom :synced-ecom="item.ProductSell.syncedecom" />
        </template>

        <template #item.syncecominprogress="{ item }">
          <ProductTemplatesSyncEcomInProgress
            :sync-ecom-in-progress="item.ProductSell.syncecominprogress"
          />
        </template>

        <template #item.syncecomfailed="{ item }">
          <ProductTemplatesSyncEcomFailed
            :sync-ecom-failed="item.ProductSell.syncecomfailed"
          />
        </template>

        <template #item.quantity="{ item }">
          <span>{{
            item.type === "KIT" ? item.ProductSell.quantity : item.quantity
          }}</span>
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
          <ProductTemplatesCounterPrice :counter-price="item.counter_price" />
        </template>

        <template #item.promotion_price="{ item }">
          <ProductTemplatesPromotionPrice :promotion-price="item.promotion_price" />
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
    </v-sheet>
  </v-main>
</template>
