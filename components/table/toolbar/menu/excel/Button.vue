<template>
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

  <v-tooltip
    location="top"
    text="EXPORTAR EXCEL"
    style="
      --v-theme-surface-variant: 4, 117, 4;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-microsoft-excel" style="color: green" />
    </template>
  </v-tooltip>
</template>
