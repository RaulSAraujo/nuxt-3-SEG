<script setup lang="ts">
import ProductCostTableMyTableToEdit from "@/components/product/cost_table/MyTable/ToEdit.vue";

const productStore = useProductStore();
const { product, costTableIndex } = storeToRefs(productStore);

const activateDialogToEdit = ref(false);

const headers = ref([
  { title: "AÇÃO", key: "action" },
  { title: "ID", key: "id" },
  { title: "ID PRODUTO", key: "product_id" },
  { title: "ID FORNECEDOR", key: "Supplier.name" },
  { title: "CAMINHO ARQUIVO", key: "filepath" },
  { title: "NOME ARQUIVO", key: "filename" },
  { title: "CUSTO", key: "cost", width: 110 },
  { title: "CUSTO EM", key: "cost_at" },
  { title: "DISPONIBILIDADE", key: "availability" },
  { title: "DISP. EM", key: "availability_at" },
  { title: "LEAD TIME", key: "lead_time" },
  { title: "LEAD TIME EM", key: "lead_time_at" },
  { title: "QUATIDADE VIRTUAL", key: "virtual_quantity" },
  { title: "QUATIDADE VIRTUAL EM", key: "virtual_quantity_at" },
  { title: "OBSERVAÇÃO", key: "observation" },
  { title: "ATIVO", key: "active" },
  { title: "CRIADO EM", key: "created_at" },
  { title: "ALTERADO EM", key: "updated_at" },
]);
</script>

<template>
  <v-data-table
    v-if="product && product.Quotations"
    class="rounded-xl border-sm pa-2"
    :headers="headers"
    :items="product.Quotations"
    hide-default-footer
    disable-sort
  >
    <template #item.action="{ item, index }">
      <div class="d-flex flex-row">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          density="comfortable"
          color="blue"
          @click="
            costTableIndex = index;
            activateDialogToEdit = true;
          "
        />

        <Delete :id="item.id" url-local="quotation" />
      </div>
    </template>

    <template #item.active="{ item }">
      <CheckIcon :value="item.active" />
    </template>

    <template #item.availability="{ item }: Record<string, any>">
      <ProductCostTableMyTableTemplatesAvailability :availability="item.availability" />
    </template>

    <template #item.cost="{ item }: Record<string, any>">
      <ToLocaleString :value="item.cost" />
    </template>

    <template #item.cost_at="{ item }">
      <DateString :date="item.cost_at" />
    </template>

    <template #item.lead_time_at="{ item }">
      <DateString :date="item.lead_time_at" />
    </template>

    <template #item.virtual_quantity_at="{ item }">
      <DateString :date="item.virtual_quantity_at" />
    </template>

    <template #item.created_at="{ item }">
      <DateString :date="item.created_at" />
    </template>

    <template #item.updated_at="{ item }">
      <DateString :date="item.updated_at" />
    </template>

    <template #item.availability_at="{ item }">
      <DateString :date="item.availability_at" />
    </template>
  </v-data-table>

  <ProductCostTableMyTableToEdit
    v-if="activateDialogToEdit"
    v-model="activateDialogToEdit"
    @disable="activateDialogToEdit = false"
  />
</template>
