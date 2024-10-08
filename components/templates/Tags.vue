<script setup lang="ts">
import type { Tag } from "~/interfaces/ShippingValidation.js";

defineProps<{
  tags: Tag[];
}>();

const headers = [
  { title: "Tag", key: "id" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Código fabricante", key: "name" },
  { title: "Descrição", key: "description" },
];
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="40vw">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" variant="plain" :disabled="tags?.length === 0">
        <v-badge color="primary" :content="tags?.length">
          <v-icon>mdi-bag-personal-tag-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <template #default>
      <v-card rounded="xl" title="Produtos">
        <template #text>
          <v-data-table
            :headers="headers"
            :items="tags"
            items-per-page="-1"
            hide-default-footer
            disable-sort
          >
            <template #item.description="{ item }">
              <Tooltip :text="item.description" :vw="10" />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
