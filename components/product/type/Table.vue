<script setup lang="ts">
const productStore = useProductStore();
const { family, kit } = storeToRefs(productStore);

const headersFamily = ref([
  { title: "ID", key: "id" },
  { title: "COD.FABRICANTE", key: "name" },
  { title: "DISP.", key: "availability" },
  { title: "TIPO", key: "type" },
  { title: "STATUS", key: "Pstatuses" },
  { title: "COD.ERP", key: "erp_product_id" },
  { title: "COD.AUXILIAR", key: "produto_chave" },
  { title: "COD.BARRA", key: "ean" },
  { title: "DESCRIÇÃO", key: "description" },
  { title: "MARCA", key: "brand" },
  { title: "LEAD TIME", key: "lead_time" },
  { title: "APARELHO", key: "apparatus" },
  { title: "CUSTO", key: "cost" },
  { title: "PREÇO", key: "price" },
  { title: "ESTOQUE", key: "quantity" },
  { title: "ESTOQUE VIRTUAL", key: "virtual_quantity" },
  { title: "IMAGEM", key: "image" },
  { title: "SUPORTE", key: "support" },
  { title: "SINC.ECOM", key: "erp_syncecom" },
  { title: "PESO", key: "gross_weight" },
  { title: "OBSERVAÇÃO", key: "observation" },
]);

const headersKit = ref([
  {
    title: "AÇÕES",
    key: "action",
  },
  {
    title: "COD.FABRICANTE",
    key: "SellPreference.name",
  },
  {
    title: "COD.ERP",
    key: "SellPreference.erp_product_id",
  },
  {
    title: "COD.AUXILIAR",
    key: "SellPreference.produto_chave",
  },
  {
    title: "DESCRIÇÃO",
    key: "SellPreference.description",
  },
  {
    title: "QUANT COMPOSIÇÃO KIT",
    key: "KitFamily.qtd_itens",
  },
  { title: "ESTOQUE", key: "SellPreference.quantity" },
  {
    title: "ESTOQUE VIRTUAL",
    key: "SellPreference.virtual_quantity",
  },
  {
    title: "LEAD TIME",
    key: "SellPreference.lead_time",
  },
  { title: "OBSERVAÇÃO", key: "SellPreference.observation" },
]);
</script>

<template>
  <v-data-table
    v-if="$route.params.type == 'FAMILY' && family"
    :items="family"
    :headers="headersFamily"
    hide-default-footer
    disable-sort
  >
    <template #item.image="{ item }">
      <CheckIcon :value="item.image ?? false" />
    </template>

    <template #item.support="{ item }">
      <CheckIcon :value="item.support ?? false" />
    </template>

    <template #item.erp_syncecom="{ item }">
      <CheckIcon :value="item.erp_syncecom ?? false" />
    </template>

    <template #item.apparatus="{ item }">
      <Tooltip :text="item.apparatus" :vw="5" />
    </template>

    <template #item.description="{ item }">
      <Tooltip :text="item.description" :vw="5" />
    </template>

    <template #item.price="{ item }">
      <ToLocaleString :value="item.price" />
    </template>

    <template #item.cost="{ item }">
      <ToLocaleString :value="item.cost" />
    </template>

    <template #item.observation="{ item }">
      <Tooltip :text="item.observation" :vw="5" />
    </template>
  </v-data-table>

  <v-data-table
    v-if="$route.params.type == 'KIT' && kit"
    :items="kit"
    :headers="headersKit"
    hide-default-footer
    disable-sort
  >
    <template #item.action="{ item }">
      <ProductTypeChangeKitCompositionRemove :id="item.id" />
    </template>

    <template #item.SellPreference.description="{ item }">
      <Tooltip :text="item.SellPreference?.description ?? ''" :vw="10" />
    </template>
  </v-data-table>
</template>
