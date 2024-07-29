<script setup lang="ts">

useHead({
  titleTemplate: `Fornecedores - %s`,
});

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = true;

const dialog = ref<boolean>(false);
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter @create="dialog = true" />

      <Table
        title="FORNECEDORES"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
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
    </v-sheet>

    <SupplierCreation v-model="dialog" @close="dialog = false" />
  </v-main>
</template>
