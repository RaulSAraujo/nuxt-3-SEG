<script setup lang="ts">
useHead({
  titleTemplate: `Cotações - %s`,
});
</script>

<template>
  <v-sheet class="mt-5" rounded="t-xl" elevation="5">
    <div class="pa-5">
      <v-btn-toggle variant="outlined" divided>
        <v-btn text="1º EXTRAIR CÓD.FAB FAMILIA" style="color: cyan" />

        <v-btn text="2º IMPORTAR COTAÇÃO" style="color: cyan" />
      </v-btn-toggle>
    </div>

    <Table title="COTAÇÕES" :disabled-menu="true" :show-select="true" :multi-sort="true">
      <template #item.not_found_file="{ item }">
        <v-btn
          v-if="item.not_found_file"
          :href="`${$config.base_url_local}${item.not_found_file}`"
          variant="plain"
          target="_blank"
          color="blue"
          text="ARQUIVO.XLSX"
        />
      </template>

      <template #item.quotation_change_file="{ item }">
        <v-btn
          v-if="item.quotation_change_file"
          variant="plain"
          :href="`${$config.base_url_local}${item.quotation_change_file}`"
          target="_blank"
          color="blue"
          text="ARQUIVO.XLSX"
        />
      </template>

      <template #item.quotation_file="{ item }">
        <v-btn
          v-if="item.quotation_file"
          variant="plain"
          :href="`${$config.base_url_local}${item.quotation_file}`"
          target="_blank"
          color="blue"
          text="ARQUIVO.XLSX"
        />
      </template>
    </Table>
  </v-sheet>
</template>
