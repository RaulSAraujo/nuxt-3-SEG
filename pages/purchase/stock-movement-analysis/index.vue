<script setup lang="ts">
useHead({
  titleTemplate: `Análise de movimentação de estoque - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">
      ANÁLISE DE MOVIMENTAÇÃO DE ESTOQUE
    </span>

    <Filter>
      <template #button-create>
        <StockMovementAnalysisCreation />
      </template>
    </Filter>

    <Table multi-sort>
      <template #item.action="{ item }">
        <div>
          <StockMovementAnalysisAnalysisMonths
            :analysis="item.StockMovementAnalysisMonths"
          />

          <StockMovementAnalysisAnalysisYears
            :analysis="item.StockMovementAnalysisYears"
          />
        </div>
      </template>
    </Table>
  </div>
</template>
