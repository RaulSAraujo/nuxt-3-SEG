<script setup lang="ts">
useHead({
  titleTemplate: `Pedidos de compra - %s`,
});

const dialog = ref<boolean>(false);
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter :activate-creation-button="true" @create="dialog = true" />

      <Table
        title="SOLICITAÇÕES DE COMPRA"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action="{ item }">
          <Delete :id="item.id" />
        </template>
      </Table>
    </v-sheet>
  </v-main>
</template>
