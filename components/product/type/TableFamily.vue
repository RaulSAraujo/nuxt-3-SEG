<script setup lang="ts">
import type { Family, Product } from "~/interfaces/Family.js";

const headersFamily = ref([
  { title: "Id", key: "id" },
  { title: "Código fabricante", key: "name" },
  { title: "Disponibilidade", key: "availability" },
  { title: "Tipo", key: "type" },
  { title: "Código erp", key: "erp_product_id" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Código barra", key: "ean" },
  { title: "Descrição", key: "description" },
  { title: "Marca", key: "brand" },
  { title: "Lead time", key: "lead_time" },
  { title: "Aparelho", key: "apparatus" },
  { title: "Custo", key: "cost" },
  { title: "Preço", key: "price" },
  { title: "Estoque", key: "quantity" },
  { title: "Estoque virtual", key: "virtual_quantity" },
  { title: "Imagem", key: "image" },
  { title: "Suporte", key: "support" },
  { title: "Sincronização ecom", key: "erp_syncecom" },
  { title: "Peso", key: "gross_weight" },
  { title: "Observação", key: "observation" },
]);

const route = useRoute();

const { data, status } = $api<Partial<Product>[]>(`${route.params.type}`, {
  key: "FamilyProduct",
  query: { id: route.params.type_id },
  transform: (fetchData) => {
    const products = ((fetchData as unknown) as Family).rows[0]
      .Products as Partial<Product>[];

    return products.map((p) => {
      return {
        id: p.id,
        name: p.name,
        availability: p.availability,
        type: p.type,
        erp_product_id: p.erp_product_id,
        produto_chave: p.produto_chave,
        ean: p.ean,
        description: p.description,
        brand: p.brand,
        lead_time: p.lead_time,
        apparatus: p.apparatus,
        cost: p.cost,
        price: p.price,
        quantity: p.quantity,
        virtual_quantity: p.virtual_quantity,
        image: p.image,
        support: p.support,
        erp_syncecom: p.erp_syncecom,
        gross_weight: p.gross_weight,
        observation: p.observation,
      };
    });
  },
});
</script>

<template>
  <v-data-table
    v-if="status === 'success'"
    :items="data || []"
    :headers="headersFamily"
    hide-default-footer
    disable-sort
  >
    <template #item.image="{ item }">
      <CheckIcon :value="item.image ?? false" :readonly="true" />
    </template>

    <template #item.support="{ item }">
      <CheckIcon :value="item.support ?? false" :readonly="true" />
    </template>

    <template #item.erp_syncecom="{ item }">
      <CheckIcon :value="item.erp_syncecom ?? false" :readonly="true" />
    </template>

    <template #item.apparatus="{ item }">
      <Tooltip :text="item.apparatus" :vw="5" />
    </template>

    <template #item.description="{ item }">
      <Tooltip :text="item.description" :vw="5" />
    </template>

    <template #item.price="{ item }">
      <ToLocaleString :value="item.price || null" />
    </template>

    <template #item.cost="{ item }">
      <ToLocaleString :value="item.cost || null" />
    </template>

    <template #item.observation="{ item }">
      <Tooltip :text="item.observation" :vw="5" />
    </template>
  </v-data-table>
</template>
