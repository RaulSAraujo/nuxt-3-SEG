<script setup lang="ts">
useHead({
  titleTemplate: `Produto venda - %s`,
});

const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">PRODUTO VENDA</span>

    <Filter />

    <Table show-select multi-sort show-expand>
      <template #item.action="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          color="pink"
          :to="{
            name: 'register-product-sell-id',
            params: { id: item.id },
          }"
          @click="product = item"
        />
      </template>

      <template #item.availability="{ item }">
        <ProductSellTemplatesAvailability
          :availability="item.Family?.SellPreference?.availability ?? ''"
          :pavailability-histories="
            item.Family?.SellPreference?.PAvailabilityHistories ?? null
          "
        />
      </template>

      <template #item.Det="{ item }">
        <ProductSellTemplatesBuyPreferenceId
          :buy-preference-id="item.Family.buy_preference_id"
          :products="item.Family.Products"
        />
      </template>

      <template #item.CategoryEcom="{ props: { item } }">
        <span>{{ item.CategoryEcom?.category_name }}</span>
      </template>

      <template #item.Ecommerces="{ item: { Ecommerces } }">
        <ProductSellTemplatesCategoryEcom :ecommerces="Ecommerces" />
      </template>

      <template #item.counter_price="{ item }">
        <ToLocaleString :value="item.Family?.SellPreference?.counter_price ?? 0" />
      </template>

      <template #item.sell_price="{ item }">
        <ToLocaleString
          :value="item.Kit ? item.Kit?.Products[0].price ?? 0 : item.sell_price ?? 0"
        />
      </template>

      <template #expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <span>{{ item.model }}</span>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
