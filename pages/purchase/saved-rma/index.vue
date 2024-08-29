<script setup lang="ts">
useHead({
  titleTemplate: `Salvados - %s`,
});

</script>

<template>
  <div class="mt-5" rounded="t-xl" elevation="5">
    <span class="ml-5 text-h6 text-primary font-weight-black">SALVADOS</span>

    <Filter :disabled-menu="false" />

    <Table :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>
    </Table>
  </div>
</template>
