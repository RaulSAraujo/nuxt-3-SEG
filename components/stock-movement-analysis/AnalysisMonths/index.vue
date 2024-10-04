<script setup lang="ts">
import type { StockMovementAnalysisMonth } from "~/interfaces/StockMovementAnalysis.js";

defineProps<{
  analysis: StockMovementAnalysisMonth[];
}>();

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers: Headers[] = [
  { title: "Id", key: "id" },
  { title: "Status custo", key: "cost_status", align: "center" },
  { title: "Dias sem estoque", key: "days_without_stock", align: "center" },
  { title: "vendas perdidas", key: "lost_sales", align: "center" },
  { title: "vendas faturadas", key: "invoiced_sales", align: "center" },
  { title: "Previsão de vendas", key: "sales_forecast", align: "center" },
  { title: "Alteração de custo", key: "from_to_cost" },
  { title: "Mês período", key: "month_period" },
];

const itemRowBackground = (row: { item: StockMovementAnalysisMonth }) => {
  if (row.item.days_without_stock_status == "PARCIAL") {
    return {
      class: "parcial-row",
    };
  }

  if (row.item.days_without_stock_status == "INTEGRAL") {
    return {
      class: "integral-row",
    };
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="65vw">
    <template #activator="{ props: dialog }">
      <v-tooltip location="top" text="Analise por mes" content-class="bg-blue">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeModels(dialog, tooltip)"
            icon="mdi-chart-box-outline"
            variant="plain"
            size="small"
            density="comfortable"
            color="blue"
            :disabled="analysis?.length === 0"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card rounded="xl" title="ANÁLISE POR MES">
        <template #text>
          <v-data-table
            :headers="headers"
            :items="analysis"
            hide-default-footer
            :row-props="itemRowBackground"
          >
            <template #item.cost_status="{ item }">
              <StockMovementAnalysisAnalysisMonthsCostStatus
                :cost-status="item.cost_status"
              />
            </template>

            <template #item.month_period="{ item }">
              <span>{{ item.month_period.toUpperCase() }}</span>
            </template>

            <template #item.from_to_cost="{ item }">
              <Tooltip :text="item.from_to_cost" :vw="5" />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
::v-deep .parcial-row {
  color: orange;
}

::v-deep .integral-row {
  color: red;
}
</style>
