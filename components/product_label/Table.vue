<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

onUnmounted(() => {
  items.value = [];
});

const items = useState<Row[]>("items-creation-label", () => []);

const headers = ref([
  { title: "Ações", key: "action" },
  { title: "Código fabricante", key: "name" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Quantidade", key: "quantity" },
  { title: "Marca", key: "brand" },
  { title: "Aparelho", key: "apparatus" },
  { title: "Descrição", key: "description" },
  { title: "Imagem", key: "image" },
  { title: "Suporte", key: "support" },
  { title: "Altura", key: "height" },
  { title: "Largura", key: "width" },
  { title: "Comprimento", key: "length" },
  { title: "Peso", key: "weight" },
]);
</script>

<template>
  <v-data-table :items="items" :headers="headers" height="60vh" hide-default-footer>
    <template #item.action="{ index }">
      <v-btn
        icon="mdi-delete"
        variant="plain"
        size="small"
        color="pink"
        density="comfortable"
        @click="items.splice(index, 1)"
      />
    </template>

    <template #item.image="{ item }">
      <CheckIcon :value="item.image ?? false" :readonly="true" />
    </template>

    <template #item.support="{ item }">
      <CheckIcon :value="item.support ?? false" :readonly="true" />
    </template>
  </v-data-table>
</template>
