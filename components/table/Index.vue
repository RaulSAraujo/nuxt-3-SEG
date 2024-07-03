<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { Grid } from "~/interfaces/Grid.js";
import { useTableStore } from "~/stores/table";

const props = defineProps<{
  title: string;
  disabledMenu: boolean;
  showSelect: boolean;
  multiSort: boolean;
}>();

defineEmits(["loadItems"]);

// Resetar props antes de desmontar o component
onBeforeUnmount(() => {
  page.value = 1;
  itemsPerPage.value = 10;

  items.value = [];
  totalItems.value = 0;

  loading.value = true;
});

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

const { model } = useModelStore();

const gridStore = useGridStore();
const { availableGrid } = storeToRefs(gridStore);

const tableStore = useTableStore();
const { page, items, itemsPerPage, totalItems, loading } = storeToRefs(tableStore);

/**
 * Request para obter a grid do usuario de acordo com a pagina
 * @param user.id Identificador do usuario
 * @param props.model Nome da model back-end
 * @constant grid Payload
 */
let grid: Grid;
$api(`grid-configurations?user_id=${user.id}&model=${model}`, {
  priority: "high",
  key: `Grid-product${model}`,
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
})
  .then((res) => {
    if (res.error.value) throw res;

    grid = res.data.value as Grid;

    if (grid.resultCount > 0) {
      gridStore.set(grid);
    } else {
      gridStore.create();
    }
  })
  .catch((err) => {
    $toast().error(err.error.value.cause ?? err.error.value.message);
  });
</script>

<template>
  <ClientOnly fallback-tag="div">
    <!-- @vue-ignore -->
    <v-data-table-server
      :headers="availableGrid"
      :items="items"
      :page="page"
      :items-per-page="itemsPerPage"
      :items-length="totalItems"
      :loading="loading"
      loading-text="Loading... Please wait"
      density="compact"
      :multi-sort="multiSort"
      :show-select="showSelect"
      hide-default-footer
      @update:options="tableStore.searchData"
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

      <template #loading>
        <v-skeleton-loader :type="`table-row@${itemsPerPage}`" />
      </template>
    </v-data-table-server>
    
    <template #fallback>
      <!-- this will be rendered on server side -->
      <v-skeleton-loader type="table" />
    </template>
  </ClientOnly>

  <TableFooter />

  <TableMenuFilterDrawer />

  <TableMenuGridDrawer />

  <TableFloatingButton :length="items.length" />
</template>
