<script setup lang="ts">
useHead({
  titleTemplate: `Urgencia de envio - %s`,
});

const getItemProps = (item: any) => {
  console.log(item);

  if (item.delayed) {
    return "highlight-row";
  }

  return "";
};

const itemRowBackground = (row: any) => {
  return { class: row.item.delayed ? "highlight-row" : "" };
};

</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">URGENCIA DE ENVIO</span>

    <Filter>
      <template #menu>
        <ShippingUrgencyMenuUpdateOrders />
      </template>
    </Filter>

    <Table multi-sort :row-props="itemRowBackground">
      <template #item.delayed="{ item }">
        <ShippingUrgencyTemplateDelayed :delayed="item.delayed" />
      </template>
    </Table>
  </div>
</template>

<style scoped>
::v-deep .highlight-row {
  color: red;
}
</style>
