<script setup lang="ts">
import type { StockMovementAnalysisYear } from "~/interfaces/StockMovementAnalysis.js";

defineProps<{
  analysis: StockMovementAnalysisYear[];
}>();

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers: Headers[] = [
  { title: "Id", key: "id" },
  { title: "Total vendas", key: "total_sales", align: "center" },
  { title: "Média vendas", key: "average_sales", align: "center" },
  { title: "Ano", key: "year" },
  { title: "Concluido", key: "completed", align: "center" },
];
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="40vw">
    <template #activator="{ props: dialog }">
      <v-tooltip location="top" text="Analise por ano" content-class="bg-green">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeModels(dialog, tooltip)"
            icon="mdi-chart-box-multiple"
            variant="plain"
            size="small"
            density="comfortable"
            color="green"
            :disabled="analysis?.length === 0"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card rounded="xl" title="ANÁLISE POR ANO">
        <template #text>
          <v-data-table
            :headers="headers"
            :items="analysis"
            hide-default-footer
            disable-sort
          >
            <template #item.completed="{ item }">
              <CheckIcon :value="item.completed" :readonly="true" />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
