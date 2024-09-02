<script setup lang="ts">
useHead({
  titleTemplate: `Solicitação de compra - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">SOLICITAÇÃO DE COMPRA</span>

    <Filter :disabled-menu="false" />

    <Table :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.user="{ item }">
        <Tooltip :text="item.user" :vw="3" />
      </template>

      <template #item.cost="{ item }">
        <ToLocaleString :value="item.cost" />
      </template>

      <template #item.status="{ item }">
        <PurchaseRequestTemplateStatus :status="item.status" />
      </template>
    </Table>
  </div>
</template>
