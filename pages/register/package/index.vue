<script setup lang="ts">
useHead({
  titleTemplate: `Embalagens - %s`,
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
        title="EMBALAGENS"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action="{ item }">
          <PackageEdit :item="item" />

          <Delete :id="item.id" />
        </template>
      </Table>
    </v-sheet>

    <PackageCreation v-model="dialog" @close="dialog = false" />
  </v-main>
</template>
