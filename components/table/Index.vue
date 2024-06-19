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
 * @constant grid Payload formatado
 * @constant headers Novo array colocando em sequencia
 */
let grid: GridData;
let headers: ComputedRef<
  {
    title: string;
    align: string;
    sortable: boolean;
    key: string;
    maxWidth: string | number | null;
    type: string;
  }[]
>;
$api(`grid-configurations?user_id=${user.id}&model=${props.model}`, {
  priority: "high",
  // key: "Grid-product",
  // getCachedData(key, nuxtApp) {
  //   return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  // },
})
  .then((res) => {
    if (res.error.value) throw res.error;

    grid = res.data.value as GridData;

    headers = computed(() =>
      grid.rows[0].available_columns
        .sort(
          (a, b) =>
            parseInt(`${b.sequence_grid}` || "0") - parseInt(`${a.sequence_grid}` || "0")
        )
        .map(({ text, align, sortable, value, width, type }) => ({
          title: text,
          key: value,
          maxWidth: width,
          align,
          sortable,
          type,
        }))
    );
  })
  .catch((err) => {
    console.error(err);
  });

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
      priority: "low",
    })
    .then((res) => {
      const data = res as { resultCount: number; rows: {}[]; totalRecords: number };

      items.value = data.rows;
      totalItems.value = data.totalRecords;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <ClientOnly>
    <v-data-table-server
      v-bind="$attrs"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      loading-text="Loading... Please wait"
      density="comfortable"
      @update:options="loadItems"
    >
      <template #top>
        <TableToolbar :title="props.title" :disabled-menu="disabledMenu" />
      </template>

      <template
        v-for="header in headers"
        :key="header.key"
        #[`item.${header.key}`]="{ item }: Record<string, any>"
      >
        <span v-if="header.type === 'DATE'">
          {{
            $dayjs(item[header.key]).isValid()
              ? $dayjs(item[header.key]).format("DD/MM/YYYY")
              : ""
          }}
        </span>

        <v-icon
          v-else-if="header.type === 'BOOLEAN'"
          size="20px"
          :icon="item.support == true ? 'mdi-check-bold' : 'mdi-close-thick'"
          :color="item.support == true ? 'green' : 'red'"
        />

        <span v-else>
          {{ item[header.key] }}
        </span>
      </template>

      <template v-for="slot in parentSlots" :key="slot" #[slot]="props">
        <slot :name="slot" v-bind="props" />
      </template>
    </v-data-table-server>
  </ClientOnly>
</template>

<style>
.v-data-table__tr .v-data-table__td {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>
