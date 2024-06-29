<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Produto compra - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
const modelName = findModelName(name?.toString() ?? "");

const filterStore = useFilterStore();

/**
 * Argumentos usados na tabela
 * @argument items Itens da tabela.
 * @argument totalItems Total de registros.
 * @argument loading usado para indicar o carregamento na tela.
 */
const items = ref<object[]>([]);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageoptions = ref([
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" },
  { value: -1, title: "Todos" },
]);
const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

/**
 * Função para obter os dados
 * @param options Informações de filtros da tabela
 */
const loadItems = async (
  options = { page: page.value, itemsPerPage: itemsPerPage.value, sortBy: [] }
) => {
  if (import.meta.server) return;

  loading.value = true;

  filterStore
    .searchData(options, "product")
    .then(async (res) => {
      const data = res as { resultCount: number; rows: object[]; totalRecords: number };

      items.value = data.rows;
      totalItems.value = data.totalRecords;
    })
    .catch((error) => {
      $toast().error(`${error.cause.message ?? error.message}`);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter :model="modelName" :mode-create="false" @search="loadItems" />

      <Table
        title="PRODUTO COMPRA"
        :items="items"
        :total-items="totalItems"
        :page="page"
        :items-per-page="itemsPerPage"
        :loading="loading"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
        :model="modelName"
        @load-items="loadItems"
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

      <div class="d-flex flex-rows justify-end align-center">
        <span class="mr-2 text-caption">Itens por página: </span>

        <v-select
          v-model="itemsPerPage"
          density="compact"
          color="primary"
          variant="outlined"
          :items="itemsPerPageoptions"
          item-title="title"
          item-value="value"
          max-width="90px"
          hide-details
          class="align-self-center"
        />

        <v-pagination v-model="page" :length="pageCount" :total-visible="7" />
      </div>
    </v-sheet>
  </v-main>
</template>
