<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { GridData } from "~/interfaces/Grid.js";

const props = defineProps<{
  title: string;
  url: string;
  model: string;
  disabledMenu: boolean;
  showSelect: boolean;
  multiSort: boolean;
}>();

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

const store = useGridStore();
const { availableGrid } = storeToRefs(store);

/**
 * Request para obter a grid do usuario de acordo com a pagina
 * @param user.id Identificador do usuario
 * @param props.model Nome da model back-end
 * @constant grid Payload
 */
let grid: GridData;
$api(`grid-configurations?user_id=${user.id}&model=${props.model}`, {
  priority: "high",
  key: "Grid-product",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
})
  .then((res) => {
    if (res.error.value) throw res;

    grid = res.data.value as GridData;

    store.setData(grid);
  })
  .catch((err) => {
    $toast().error(err.error.value.cause ?? err.error.value.message);
  });

/**
 * Argumentos usados na tabela
 * @argument items Itens da tabela.
 * @argument totalItems Total de registros.
 * @argument loading usado para indicar o carregamento na tela.
 */
const items = ref<object[]>([]);
const totalItems = ref(0);
const loading = ref(false);

/**
 * Função para obter os dados
 * @param options Informações de filtros da tabela
 */
const loadItems = async (options = { page: 1, itemsPerPage: 10, sortBy: [] }) => {
  if (import.meta.server) return;

  loading.value = true;

  let sortField = undefined;
  let sortType = undefined;
  if (options.sortBy.length > 0) {
    sortField = options.sortBy.map(({ key }) => key).join(",");
    sortType = options.sortBy.map(({ order }) => order).join(",");
  }

  useNuxtApp()
    .$customFetch(props.url, {
      method: "GET",
      params: {
        page: options.page,
        perPage: options.itemsPerPage,
      },
      query: {
        "sort-field[]": sortField,
        "sort-type[]": sortType,
      },
      priority: "low",
    })
    .then(async (res) => {
      const data = res as { resultCount: number; rows: object[]; totalRecords: number };

      items.value = data.rows;
      totalItems.value = data.totalRecords;
    })
    .catch((error) => {
      $toast().error(`${error.cause.message ?? error.message}`);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <ClientOnly fallback-tag="div">
    <!-- @vue-ignore -->
    <v-data-table-server
      :headers="availableGrid"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      loading-text="Loading... Please wait"
      density="compact"
      :multi-sort="multiSort"
      :show-select="showSelect"
      @update:options="loadItems"
    >
      <template #top>
        <TableToolbar :title="props.title" :disabled-menu="disabledMenu" />
      </template>

      <template
        v-for="header in availableGrid"
        :key="header.key"
        #[`item.${header.key}`]="{ item }: Record<string, any>"
      >
        <TableTemplatesDate v-if="header.type === 'DATE'" :value="item[header.key]" />

        <TableTemplatesBoolean
          v-else-if="header.type === 'BOOLEAN'"
          :value="item[header.key]"
        />

        <template v-else>
          <template
            v-if="header.type === 'STRING' && typeof item[header.key] === 'string'"
          >
            <TableTemplatesString
              :value="item[header.key]"
              :max-width="header.maxWidth"
            />
          </template>

          <span v-else>{{ item[header.key] }}</span>
        </template>
      </template>

      <!-- @vue-skip -->
      <template v-for="slot in parentSlots" :key="slot" #[slot]="props">
        <slot :name="slot" v-bind="props" />
      </template>
    </v-data-table-server>

    <template #fallback>
      <!-- this will be rendered on server side -->
      <v-skeleton-loader type="table" />
    </template>
  </ClientOnly>

  <TableMenuFilterDrawer />

  <TableMenuGridDrawer />
</template>
