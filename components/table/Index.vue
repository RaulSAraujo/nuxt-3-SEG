<script setup lang="ts">
const props = defineProps<{
  showSelect?: boolean;
  multiSort?: boolean;
  routerFull?: boolean | undefined;
  showExpand?: boolean;
  othersParams?: object | undefined;
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

    sortBy.value = undefined;

    selected.value = [];

    expanded.value = [];

    gridStore.clearGridProps();

    loading.value = true;

    full.value = undefined;

    otParams.value = undefined;

    next();
  }
});

// Remove expand header
onMounted(() => {
  if (!props.showExpand && availableGrid.value[0]?.key == "data-table-expand") {
    availableGrid.value.splice(0, 1);
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
const { availableGrid, availableFormat } = storeToRefs(gridStore);

const tableStore = useTableStore();
const {
  page,
  items,
  itemsPerPage,
  totalItems,
  sortBy,
  loading,
  routerFull: full,
  expanded,
  selected,
  othersParams: otParams,
} = storeToRefs(tableStore);
tableStore.findRouteMap();

const expandedAll = ref(false);

if (props.routerFull == true) {
  full.value = props.routerFull;
}

if (props.othersParams) {
  otParams.value = props.othersParams;
}

await gridStore.get();
</script>

<template>
  <!-- @vue-skip -->
  <v-data-table-server
    v-model="selected"
    v-model:expanded="expanded"
    v-model:sort-by="sortBy"
    :headers="availableGrid"
    :items="items"
    item-value="id"
    select-strategy="all"
    :page="page"
    :items-per-page="itemsPerPage"
    :items-length="totalItems"
    :loading="loading"
    loading-text="Loading... Please wait"
    :show-expand="showExpand"
    :show-select="showSelect"
    :multi-sort="multiSort"
    density="compact"
    hide-default-footer
    return-object
    @update:options="tableStore.searchData"
  >
    <template
      v-for="header in availableFormat"
      :key="header.key"
      #[`item.${header.key}`]="{ item }"
    >
      <TableTemplatesDate v-if="header.type === 'DATE'" :value="item[header.key]" />

      <TableTemplatesBoolean
        v-else-if="header.type === 'BOOLEAN'"
        :value="item[header.key]"
      />

      <template v-else>
        <template
          v-if="
            (header.type === 'STRING' && typeof item[header.key] === 'string') ||
            (header.type === 'ARRAY' && typeof item[header.key] === 'string')
          "
        >
          <TableTemplatesString :value="item[header.key]" :max-width="header.maxWidth" />
        </template>

        <span v-else>{{ item[header.key] }}</span>
      </template>
    </template>

    <template v-for="slot of parentSlots" :key="slot" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>

    <template #header.data-table-select="{ selectAll, allSelected, someSelected }">
      <v-checkbox
        id="tableSelect"
        :value="!allSelected"
        :indeterminate="someSelected && !allSelected"
        hide-details
        @click="selectAll(!allSelected)"
      />
    </template>

    <template #header.data-table-expand>
      <v-btn
        v-if="!expandedAll"
        id="expandAll"
        icon="mdi-chevron-down"
        variant="plain"
        @click="
          () => {
            expandedAll = true;

            items.forEach((i) => expanded.push(i));
          }
        "
      />

      <v-btn
        v-else
        id="closeAll"
        icon="mdi-chevron-up"
        variant="plain"
        @click="
          () => {
            expandedAll = false;

            expanded = [];
          }
        "
      />
    </template>

    <template #loader="{ isActive }">
      <v-progress-linear v-if="isActive" color="primary" indeterminate height="2" />
    </template>
  </v-data-table-server>

  <TableFooter />

  <DrawerFilter />

  <DrawerGrid />

  <BottomSheet>
    <template #selection-group-button>
      <slot name="selection-group-button" />
    </template>

    <template #selection-text>
      <slot name="selection-text" />
    </template>
  </BottomSheet>

  <TableFloatingButton :length="items.length" />
</template>

<style>
.v-theme--dark .v-data-table__thead {
  background-color: #3c3c3cb0;
}

.v-theme--light .v-data-table__thead {
  background-color: #eeeeee;
}
</style>
