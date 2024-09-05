<script setup lang="ts">
useHead({
  titleTemplate: `Cotações - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">COTAÇÕES</span>

    <div class="ma-4">
      <QuotationExportFamily />

      <QuotationImportQuotation />

      <FilterMenuGridButton />
    </div>

    <Table show-expand>
      <template #item.not_found_file="{ item }">
        <ClientOnly>
          <v-btn
            v-if="item.not_found_file"
            :href="`${$config.public.base_url_local}${item.not_found_file}`"
            variant="plain"
            target="_blank"
            color="blue"
            text="ARQUIVO.XLSX"
          />
        </ClientOnly>
      </template>

      <template #item.quotation_change_file="{ item }">
        <ClientOnly>
          <v-btn
            v-if="item.quotation_change_file"
            variant="plain"
            :href="`${$config.public.base_url_local}${item.quotation_change_file}`"
            target="_blank"
            color="blue"
            text="ARQUIVO.XLSX"
          />
        </ClientOnly>
      </template>

      <template #item.quotation_file="{ item }">
        <ClientOnly>
          <v-btn
            v-if="item.quotation_file"
            variant="plain"
            :href="`${$config.public.base_url_local}${item.quotation_file}`"
            target="_blank"
            color="blue"
            text="ARQUIVO.XLSX"
          />
        </ClientOnly>
      </template>

      <template #expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <QuotationTableProduct :items="item.QuotationItems" />
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
