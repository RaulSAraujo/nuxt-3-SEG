<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Classificação de aparelhos - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "classification-apparatus";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = true;

const dialog = ref<boolean>(false);
</script>

<template>
  <v-main class="mt-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para aparelhos"
        :to="{
          name: 'register-device',
        }"
      />
    </div>

    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <v-container fluid tag="div">
        <Filter @create="dialog = true" />

        <Table
          title="CLASSIFICAÇÃO DE APARELHOS"
          :disabled-menu="false"
          :show-select="true"
          :multi-sort="true"
        >
          <template #item.action="{ item }">
            <Delete :id="item.id" />
          </template>
        </Table>
      </v-container>

      <ClassificationApparatusCreation v-model="dialog" @close="dialog = false" />
    </v-sheet>
  </v-main>
</template>
