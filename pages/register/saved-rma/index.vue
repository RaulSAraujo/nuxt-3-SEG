<script setup lang="ts">
useHead({
  titleTemplate: `Salvados - %s`,
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5" rounded="t-xl" elevation="5">
    <span class="ml-5 text-h6 text-primary font-weight-black">SALVADOS</span>

    <Filter
      :activate-creation-button="true"
      :disabled-menu="false"
      @create="dialog = true"
    />

    <Table :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>
    </Table>
  </div>
</template>
