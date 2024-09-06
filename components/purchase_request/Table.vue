<script setup lang="ts">
interface Items {
  quantity_purchased: number;
  quantity_reserved: number;
  name: string;
  description: string;
  cost: number | string;
  reservation: string;
  sending_limit_at: string;
}

const props = defineProps<{
  items: Items[];
}>();

const itemsComputed = computed(() => props.items);

const headers = ref([
  { title: "Ações", key: "action" },
  { title: "Código de fabricante", key: "name" },
  { title: "Descrição", key: "description" },
  { title: "Quantidade comprada", key: "quantity_purchased" },
  { title: "Quantidade finalidade", key: "quantity_reserved" },
  { title: "Finalidade", key: "reservation" },
  { title: "Custo fornecedor", key: "cost" },
  { title: "Data limite", key: "sending_limit_at" },
]);
</script>

<template>
  <v-data-table
    :items="itemsComputed"
    :headers="headers"
    height="60vh"
    disable-sort
    hide-default-footer
  >
    <template #item.action="{ index }">
      <v-btn
        icon="mdi-delete"
        variant="plain"
        size="small"
        color="pink"
        density="comfortable"
        @click="itemsComputed.splice(index, 1)"
      />
    </template>
  </v-data-table>
</template>
