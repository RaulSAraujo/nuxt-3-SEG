<script setup lang="ts">
useHead({
  titleTemplate: `Produto compra - %s`,
});

// import type { User } from "~/interfaces/User";

// interface FilterData {
//   resultCount: number;
//   rows: {
//     available_filters: {}[];
//     hidden_filters: {}[];
//   }[];
//   totalRecords: number;
// }

// const { data } = useAuth();
// const user = data.value as User;

const { findModelName } = useModelStore();
const { name }: any = useRoute();
const modelName = findModelName(name);

// const resFilter = await $api(`custom-filters-user?user_id=${user.id}&model=${modelName}`);

// if (resFilter.error.value) {
//   console.error(resFilter.error.value);
// }

// const filter = resFilter.data.value as FilterData;
</script>

<template>
  <Table title="PRODUTO COMPRA" url="product" show-select multi-sort :model="modelName">
    <template #item.action>
      <v-btn icon="mdi-pencil" variant="plain" size="small" color="pink" />
    </template>

    <template #item.pref="{ item }">
      <ProductTemplatesPref :item="item" />
    </template>

    <template #item.availability="{ item }">
      <ProductTemplatesAvailability
        :availability="item.availability"
        :PAvailabilityHistories="item.PAvailabilityHistories"
      />
    </template>

    <template #item.pstatuses="{ item }">
      <ProductTemplatesStatus :item="item" />
    </template>

    <template #item.name="{ item }">
      <ProductTemplatesName
        :name="item.name"
        :observation_cod_fab="item.observation_cod_fab"
      />
    </template>

    <template #item.erp_syncecom="{ item }">
      <ProductTemplatesSyncEcom :item="item" />
    </template>

    <template #item.syncedecom="{ item }">
      <ProductTemplatesSyncedEcom :item="item" />
    </template>

    <template #item.syncecominprogress="{ item }">
      <ProductTemplatesSyncEcomInProgress :item="item" />
    </template>

    <template #item.syncecomfailed="{ item }">
      <ProductTemplatesSyncEcomFailed :item="item" />
    </template>

    <template #item.quantity="{ item }">
      <span>{{ item.type === "KIT" ? item.ProductSell.quantity : item.quantity }}</span>
    </template>

    <template #item.ProductSell.Ecommerces="{ item }">
      <ProductTemplatesEcommerces
        :erp_ecommerce_id="item.ProductSell.Ecommerces[0]?.erp_ecommerce_id ?? null"
        :ecom_product_id_0="
          item.ProductSell.Ecommerces[0]?.EcommerceProductSell.ecom_product_id ?? null
        "
        :ecom_product_id_1="
          item.ProductSell.Ecommerces[1]?.EcommerceProductSell.ecom_product_id ?? null
        "
      />
    </template>

    <template #item.price="{ item }">
      <ProductTemplatesPrice
        :price="item.price"
        :promotion_price="item.promotion_price"
        :promotion_starts_at="item.promotion_starts_at"
        :promotion_ends_at="item.promotion_ends_at"
      />
    </template>

    <template #item.cost="{ item }">
      <ProductTemplatesCost :cost="item.cost" :cost_at="item.cost_at" />
    </template>

    <template #item.gross_margin="{ item }">
      <ProductTemplatesGrossMargin :cost="item.cost" :price="item.price" />
    </template>

    <template #item.price_table_id="{ item }">
      <span>{{ item.TablePrice?.name }}</span>
    </template>

    <template #item.counter_price="{ item }">
      <ProductTemplatesCounterPrice :counter_price="item.counter_price" />
    </template>

    <template #item.promotion_price="{ item }">
      <ProductTemplatesPromotionPrice :promotion_price="item.promotion_price" />
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
</template>
