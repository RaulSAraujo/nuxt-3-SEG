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

const dialog = ref<boolean>(false);
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter @create="dialog = true" />

      <Table
        title="VALIDAÇÃO DE IMAGENS"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action="{ item }">
          <UtilsDelete :id="item.id" />
        </template>

        <template #item.status="{ item }">
          <ValidateImageTemplatesStatus
            :id="item.id"
            :status="item.status"
            @save="item.status = $event"
          />
        </template>

        <template #item.supplier="{ item }">
          <span>
            {{ item.Product?.brand ?? "" }}
          </span>
        </template>

        <template #item.produto_chave="{ item }">
          <span>{{ item.Product?.produto_chave ?? "" }}</span>
        </template>

        <template #item.description="{ item }">
          <UtilsTooltip :text="item.Product?.description ?? ''" :vw="15" />
        </template>

        <template #item.user_id="{ item }">
          <UtilsTooltip :text="item.User?.name" :vw="8" />
        </template>

        <template #item.observation="{ item }">
          <UtilsEditDialogTextField
            :id="item.id"
            :text="item.observation ?? ''"
            attr="observation"
            :vw="5"
            @update-text="item.observation = $event"
          />
        </template>
      </Table>

      <ValidateImageNew v-model="dialog" @push="" @close="dialog = false" />
    </v-sheet>
  </v-main>
</template>
