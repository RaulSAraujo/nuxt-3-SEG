<script setup lang="ts">
useHead({
  titleTemplate: `Embalagens - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">EMBALAGENS</span>

    <Filter :disabled-menu="false">
      <template #button-create>
        <PackageCreation />
      </template>
    </Filter>

    <Table :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <PackageEdit :item="item" />

        <Delete :id="item.id" />
      </template>
    </Table>
  </div>
</template>
