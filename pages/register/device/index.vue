<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";
import type { ClassificationApparatus } from "~/interfaces/ClassificationApparatus.js";

useHead({
  titleTemplate: `Aparelhos - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "apparatus";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = true;

const dialog = ref<boolean>(false);

const { data: classification } = await $api<ClassificationApparatus>(
  "classification-apparatus"
);
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter @create="dialog = true" />

      <Table
        title="APARELHOS"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action="{ item }">
          <Delete :id="item.id" />
        </template>

        <template #item.apparatus_name="{ item }">
          <EditDialogString
            :id="item.id"
            :text="item.apparatus_name ?? ''"
            attr="apparatus_name"
            :vw="10"
            @update-text="item.apparatus_name = $event"
          />
        </template>

        <template #item.classification_apparatus_id="{ item }">
          <EditDialogObject
            :id="item.id"
            attr="classification_apparatus_id"
            :value="item.classification_apparatus_id"
            :items="classification!.rows"
            item-title="name"
            item-value="id"
            @update-text="item.classification_apparatus_id = $event"
          >
            <template #default="props">
              <span v-if="!!item.ClassificationApparatu" v-bind="props">
                {{ item.ClassificationApparatu!.name?.toUpperCase() }}
              </span>

              <div v-else v-bind="props">
                <v-label />
              </div>
            </template>
          </EditDialogObject>
        </template>

        <template #menu>
          <v-tooltip location="top" text="CLASSIFICAÇÃO DE APARELHOS">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-sort-alphabetical-ascending-variant"
                :to="{
                  name: 'register-device-classification-apparatus',
                }"
              />
            </template>
          </v-tooltip>
        </template>
      </Table>
    </v-sheet>

    <DeviceCreation
      v-model="dialog"
      :classification-items="classification!.rows"
      @close="dialog = false"
    />
  </v-main>
</template>
