<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Validação de imagens - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "validate-products-image";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = true;
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter />

      <Table
        title="VALIDAÇÃO DE IMAGENS"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action>
          <v-btn icon="mdi-delete" variant="plain" size="small" color="pink" />
        </template>

        <template #item.status="{ item }">
          <ValidateImageTemplatesStatus
            :status="item.status"
            @save="item.status = $event"
          />
        </template>

        <template #item.supplier="{ item }">
          <span>{{ item.Product?.brand }}</span>
        </template>

        <template #item.produto_chave="{ item }">
          <span>{{ item.Product?.produto_chave }}</span>
        </template>

        <template #item.description="{ item }">
          <UtilsTooltip :text="item.Product?.description" :vw="15" />
        </template>

        <template #item.user_id="{ item }">
          <UtilsTooltip :text="item.User?.name" :vw="8" />
        </template>

        <template #item.observation="{ item }">
          <UtilsEditDialogTextField
            :text="item.observation"
            :vw="5"
            @save="item.observation = $event"
          />
        </template>
      </Table>
    </v-sheet>
  </v-main>
</template>
