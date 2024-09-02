<script setup lang="ts">
import type { ClassificationApparatus } from "~/interfaces/ClassificationApparatus.js";

useHead({
  titleTemplate: `Aparelhos - %s`,
});

const { data: classification } = await $api<ClassificationApparatus>(
  "classification-apparatus"
);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">APARELHOS</span>

    <Filter >
      <template #button-create>
        <DeviceCreation :classification-items="classification!.rows" />
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
    </Filter>

    <Table :show-select="true" :multi-sort="true">
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
    </Table>
  </div>
</template>
