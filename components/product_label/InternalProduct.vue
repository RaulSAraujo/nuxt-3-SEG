<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product.js";

const items = ref<Row[]>([]);

const headers = ref([
  { title: "Ações", key: "action" },
  { title: "Código fabricante", key: "name" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Aparelho", key: "apparatus" },
  { title: "Descrição", key: "description" },
]);

const name = ref("");
const produto_chave = ref("");

const findProduct = async () => {
  const res = await useNuxtApp().$customFetch<Product>(`product`, {
    params: {
      page: 1,
      perPage: 50,
      full: false,
      unique: true,
      name: `${name.value}`,
      produto_chave: produto_chave.value.length > 0 ? produto_chave.value : undefined,
    },
  });

  if (res.rows.length > 0) {
    items.value = res.rows;
  }
};

const itemsCreation = useState<Row[]>("items-creation-label", () => []);

const add = (item: Row) => {
  const duplicate = useArrayFind(itemsCreation.value, (e) => e.name == item.name);

  if (!duplicate.value) {
    itemsCreation.value.push({ ...item, quantity: 1 });
  } else {
    duplicate.value.quantity += 1;
  }
};

const close = () => {
  items.value = [];

  name.value = "";
  produto_chave.value = "";
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="40vw" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-tooltip location="top" text="Adicionar produtos #">
        <template #activator="{ props: tooltip }">
          <v-btn v-bind="mergeModels(dialog, tooltip)" icon="mdi-pound" variant="plain" />
        </template>
      </v-tooltip>
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="PESQUISAR PRODUTOS #">
        <template #text>
          <v-row dense class="mb-1">
            <v-col>
              <TextField
                v-model="name"
                label="Digite o código de fabricante"
                @keypress.enter="findProduct"
              />
            </v-col>
            <v-col cols="4">
              <TextField
                v-model="produto_chave"
                label="Digite o código auxiliar"
                @keypress.enter="findProduct"
              />
            </v-col>
            <v-col cols="2">
              <v-btn text="Buscar" variant="flat" color="primary" @click="findProduct" />
            </v-col>
          </v-row>

          <v-data-table :items="items" :headers="headers" hide-default-footer>
            <template #item.action="{ item }">
              <v-btn
                icon="mdi-plus"
                variant="plain"
                size="small"
                color="green"
                density="comfortable"
                @click="
                  add(item);

                  isActive.value = false;
                "
              />
            </template>

            <template #item.description="{ item }">
              <Tooltip :text="item.description" :vw="6" />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
