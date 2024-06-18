<script setup>
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
</script>

<template>
  <v-menu location="start" offset="10 0">
    <template #activator="{ props }">
      <v-btn v-if="!disabled" icon="mdi-dots-vertical" variant="plain" v-bind="props" />
    </template>

    <v-btn-toggle variant="flat" rounded="xl">
      <slot name="menu" />

      <!-- <v-tooltip v-if="!disabledExcel" top color="green">
          <template #activator="{ on, attrs }">
            <v-btn
              v-if="computedSelected == !computedSelected"
              text
              v-bind="attrs"
              @click="$refs.ExportarExcel.dialog = true"
              v-on="on"
            >
              <v-icon color="green">mdi-microsoft-excel</v-icon>
            </v-btn>

            <v-btn v-else text v-bind="attrs" v-on="on">
              <downloadexcel
                :data="computedSelected"
                :fields="fieldsExcel"
                :worksheet="`${$route.path.replaceAll('/', '')}`"
                :name="`${$route.path.replaceAll('/', '')} ${$moment().format(
                  'DD-MM-YYYY hh-mm-ss'
                )}.xls`"
              >
                <v-icon color="green">mdi-microsoft-excel</v-icon>
              </downloadexcel>
            </v-btn>
          </template>
          <span
            >{{
              computedSelected.length === 0 ? "EXPORTAR EXCEL" : "EXPORTAR SELECIONADOS"
            }}
          </span>
        </v-tooltip> -->

      <v-tooltip location="top" text="EXPORTAR EXCEL">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-microsoft-excel" />
        </template>
      </v-tooltip>

      <v-tooltip location="top" text="CONFIGURAÇÕES DE FILTRO">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-table-filter" />
          <!-- @click="drawerFilter()" -->
        </template>
      </v-tooltip>

      <v-tooltip location="top" text="CONFIGURAÇÕES DA GRID">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-view-grid-plus-outline" />
          <!-- @click="drawerGrid()" -->
        </template>
      </v-tooltip>
    </v-btn-toggle>
  </v-menu>
</template>
