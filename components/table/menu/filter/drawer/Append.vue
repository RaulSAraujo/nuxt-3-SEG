<script setup lang="ts">
const switchFilter = ref<boolean>(false);

const items = ref<{ title: string; icon: string; action: Function }[]>([
  {
    title: "ATUALIZAR",
    icon: "mdi-reload",
    action: () => {},
  },
  {
    title: "REDEFINIR",
    icon: "mdi-lock-reset",
    action: () => {},
  },
  {
    title: "IMPORTAR",
    icon: "mdi-table-arrow-left",
    action: () => {},
  },
  {
    title: "EXPORTAR",
    icon: "mdi-table-arrow-right",
    action: () => {},
  },
]);
</script>

<template>
  <v-divider />

  <v-row no-gutters class="pa-2">
    <v-btn prepend-icon="mdi-content-save" variant="plain" class="text-caption">
      SALVAR ALTERAÇÕES
    </v-btn>

    <v-spacer />

    <v-tooltip
      position="start"
      :text="switchFilter ? 'VISUALIZAR FILTROS OCULTOS' : 'VISUALIZAR FILTROS ATIVOS'"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :icon="switchFilter ? 'mdi-view-grid-plus' : 'mdi-view-grid'"
          color="cyan"
          variant="plain"
          @click="switchFilter = !switchFilter"
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
