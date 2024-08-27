<script setup lang="ts">
const props = defineProps<{
  showSelect: boolean;
  multiSort: boolean;
  routerFull?: boolean;
  showExpand?: boolean;
}>();

defineEmits(["loadItems"]);

// Resetar props
onBeforeRouteLeave((to, from, next) => {
  if (Object.keys(to.params).length > 0) {
    next();
  } else {
    page.value = 1;
    itemsPerPage.value = 10;

    items.value = [];
    totalItems.value = 0;

    gridStore.clearGridProps();

    loading.value = true;

    next();
  }
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

const gridStore = useGridStore();
const { availableGrid, drawer: drawerGrid } = storeToRefs(gridStore);

const store = useFilterStore();
const { drawer: drawerFilter } = storeToRefs(store);

const tableStore = useTableStore();
const { page, items, itemsPerPage, totalItems, loading, routerFull: full } = storeToRefs(
  tableStore
);
tableStore.findRouteMap();

if (props.routerFull == true || props.routerFull == false) {
  full.value = props.routerFull;
}

gridStore.get();

const expanded = ref<Array<number>>([]);
</script>

<template>
  <!-- @vue-ignore -->
  <v-data-table-server
    v-model:expanded="expanded"
    :headers="availableGrid"
    :items="items"
    :page="page"
    :items-per-page="itemsPerPage"
    :items-length="totalItems"
    :loading="loading"
    loading-text="Loading... Please wait"
    :show-expand="showExpand"
    :multi-sort="multiSort"
    density="compact"
    hide-default-footer
    @update:options="tableStore.searchData"
  >
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
        <template v-if="header.type === 'STRING' && typeof item[header.key] === 'string'">
          <TableTemplatesString :value="item[header.key]" :max-width="header.maxWidth" />
        </template>

        <span v-else>{{ item[header.key] }}</span>
      </template>
    </template>

    <!-- @vue-skip -->
    <template v-for="slot in parentSlots" :key="slot" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>

    <template #header.data-table-expand="{ selectAll, allSelected }">
      <v-btn
        v-if="!allSelected"
        icon="mdi-chevron-down"
        variant="plain"
        @click="
          () => {
            selectAll(true);
            // @ts-ignore
            items.forEach((i) => expanded.push(i.id));
          }
        "
      />
      <v-btn
        v-else
        icon="mdi-chevron-up"
        variant="plain"
        @click="
          () => {
            selectAll(false);

            expanded = [];
          }
        "
      />
    </template>
  </v-data-table-server>

  <TableFooter />

  <DrawerFilter v-if="drawerFilter" />

  <DrawerGrid v-if="drawerGrid" />

  <TableFloatingButton :length="items.length" />
</template>

<style>
.v-theme--dark .v-data-table__thead {
  background-color: #3c3c3cb0;
}

.v-theme--light .v-data-table__thead {
  background-color: #f0f0f0;
}
</style>
