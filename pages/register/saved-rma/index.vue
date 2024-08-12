<script setup lang="ts">
useHead({
  titleTemplate: `Salvados - %s`,
});

const dialog = ref<boolean>(false);
</script>

<template>
  <v-sheet class="mt-5" rounded="t-xl" elevation="5">
    <Filter :activate-creation-button="true" @create="dialog = true" />

    <Table title="SALVADOS" :disabled-menu="false" :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>
    </Table>
  </v-sheet>
</template>
