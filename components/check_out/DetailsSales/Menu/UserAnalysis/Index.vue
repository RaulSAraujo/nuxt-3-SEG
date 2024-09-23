<script setup lang="ts"></script>

<template>
  <v-dialog transition="dialog-top-transition" width="50VW">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="ANALISE DE USUARIO"
        style="
          --v-theme-surface-variant: 7, 119, 119;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeModels(tooltip, dialog)"
            icon="mdi-account-group-outline"
            style="color: darkcyan"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="ANALISE DE USUARIO" rounded="xl">
        <template #default>
          <v-row class="mx-2 mb-2" justify="space-between">
            <v-col cols="4">
              <CheckOutDetailsSalesMenuUserAnalysisDatePicker />
            </v-col>

            <v-col cols="2">
              <CheckOutDetailsSalesMenuUserAnalysisButton />
            </v-col>
          </v-row>

          <CheckOutDetailsSalesMenuUserAnalysisTable />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
