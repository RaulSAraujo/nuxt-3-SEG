<script setup lang="ts">
useHead({
  titleTemplate: `Romaneio - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">ROMANEIO</span>

    <Filter>
      <template #button-create>
        <v-btn
          class="mr-2"
          color="primary"
          text="CRIAR"
          :to="{
            name: 'expedition-romaneio-creation',
          }"
        />
      </template>
    </Filter>

    <Table multi-sort show-expand>
      <template #item.action="{ item }">
        <RomaneioAlterStatus :sales-order="item.SalesOrders" />

        <Delete :id="item.id" />
      </template>

      <template #item.pdf="{ item }">
        <RomaneioPdf :id="item.id" />
      </template>

      <template #expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" class="pa-0">
            <RomaneioTemplateTable :sales-orders="item.SalesOrders" />
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
