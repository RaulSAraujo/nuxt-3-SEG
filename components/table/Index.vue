<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { GridData } from "~/interfaces/Grid.js";

const props = defineProps({
  title: { type: String, default: "" },
  url: { type: String, default: "" },
  model: { type: String, default: "" },
  disabledMenu: { type: Boolean, default: false },
});

/**
 * Argumentos usados na tabela
 * @argument items Itens da tabela.
 * @argument totalItems Total de registros.
 * @argument loading usado para indicar o carregamento na tela.
 */
const items = ref<{}[]>([]);
const totalItems = ref(0);
const loading = ref(false);

/**
 * Argumentos slots obtidos no componente pai passados para o filho
 * @constant ctx Obter os slots
 * @constant parentSlots Obter apenas as chaves
 */
const ctx = useSlots();
const parentSlots = computed(() => Object.keys(ctx));

/**
 * @constant data Dados do usuario
 * @constant user Formatação
 */
const { data } = useAuth();
const user = data.value as User;

/**
 * Request para obter a grid do usuario de acordo com a pagina
 * @param user.id Identificador do usuario
 * @param props.model Nome da model back-end
 * @constant grid Formatação
 */
const res = await $api(`grid-configurations?user_id=${user.id}&model=${props.model}`);
const grid = res.data.value as GridData;

/**
 * Gerar novo array filtrando as grids iniciais e colocando em sequencia
 */
const headers = computed(() =>
  grid.rows[0].available_columns
    .filter((filter) => filter.initial_grid === true)
    .sort(
      (a, b) =>
        parseInt(`${b.sequence_grid}` || "0") - parseInt(`${a.sequence_grid}` || "0")
    )
    .map(({ text, align, sortable, value }) => ({
      title: text,
      align: align,
      sortable: sortable,
      key: value,
    }))
);

/**
 * Função para obter os dados
 * @param options Informações de filtros da tabela
 */
const loadItems = async (options = { page: 1, itemsPerPage: 10, sortBy: [] }) => {
  loading.value = true;

  useNuxtApp()
    .$customFetch(props.url, {
      method: "GET",
      params: {
        page: options.page,
        perPage: options.itemsPerPage,
      },
      retry: 3,
    })
    .then((res) => {
      const data = res as { resultCount: number; rows: {}[]; totalRecords: number };

      items.value = data.rows;
      totalItems.value = data.totalRecords;
    })
    .catch((error) => {
      console.error(error?.error.value);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    loading-text="Loading... Please wait"
    density="compact"
    @update:options="loadItems"
  >
    <template #top>
      <TableToolbar :title="props.title" :disabled-menu="disabledMenu" />
    </template>

    <template v-for="slot in parentSlots" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
  </v-data-table-server>
</template>
