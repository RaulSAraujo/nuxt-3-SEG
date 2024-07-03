<script setup lang="ts">
defineProps<{
  availableOrHidden: boolean;
}>();

defineEmits(["switch"]);

const filterStore = useFilterStore();
const { dialogImport } = storeToRefs(filterStore);

const items = ref<{ title: string; icon: string; action: VoidFunction }[]>([
  {
    title: "ATUALIZAR",
    icon: "mdi-reload",
    action: () => filterStore.update(),
  },
  {
    title: "REDEFINIR",
    icon: "mdi-lock-reset",
    action: () => filterStore.reset(),
  },
  {
    title: "IMPORTAR",
    icon: "mdi-table-arrow-left",
    action: () => (dialogImport.value = true),
  },
  {
    title: "EXPORTAR",
    icon: "mdi-table-arrow-right",
    action: () => filterStore.exportGrid(),
  },
]);
</script>

<template>
  <v-divider />

  <v-row no-gutters class="pa-2">
    <v-btn
      prepend-icon="mdi-content-save"
      variant="plain"
      class="text-caption"
      @click="filterStore.save()"
    >
      SALVAR ALTERAÇÕES
    </v-btn>

    <v-spacer />

    <v-tooltip
      position="start"
      :text="
        availableOrHidden ? 'VISUALIZAR FILTROS ATIVOS' : 'VISUALIZAR FILTROS OCULTOS'
      "
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :icon="availableOrHidden ? 'mdi-view-grid' : 'mdi-view-grid-plus'"
          color="cyan"
          variant="plain"
          @click="$emit('switch')"
        />
      </template>
    </v-tooltip>

    <v-menu location="end" transition="slide-y-transition" offset="14 0">
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="plain" icon="mdi-dots-vertical" />
      </template>

      <v-list rounded="xl">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          density="compact"
          @click="item.action"
        />
      </v-list>
    </v-menu>
  </v-row>
</template>
