<script setup lang="ts">
useHead({
  titleTemplate: `Fornecedores - %s`,
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">FORNECEDORES</span>

    <Filter
      :activate-creation-button="true"
      :disabled-menu="false"
      @create="dialog = true"
    />

    <Table :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.active="{ item }">
        <CheckIcon
          :id="item.id"
          :value="item.active ?? false"
          attr="active"
          :enable-alert="true"
          @update-value="item.active = $event"
        />
      </template>

      <template #item.name="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.name ?? ''"
          attr="name"
          :vw="8"
          @update-text="item.name = $event"
        />
      </template>

      <template #item.virtual_quantity="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.virtual_quantity ?? 0"
          attr="virtual_quantity"
          @update-text="item.virtual_quantity = $event"
        />
      </template>

      <template #item.lead_time="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.lead_time ?? 0"
          attr="lead_time"
          @update-text="item.lead_time = $event"
        />
      </template>
    </Table>

    <SupplierCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
