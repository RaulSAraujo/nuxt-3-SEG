<script setup lang="ts">
import type { Row } from "~/interfaces/ClassificationApparatus.js";

const name = ref("");

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<Row>("classification-apparatus", {
      method: "POST",
      body: {
        name: name.value,
      },
    });

    $toast().success("Novo aparelho criado.");

    items.value.splice(0, 0, {
      ...res,
    });
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  name.value = "";
};
</script>

<template>
  <v-dialog width="280px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVA CLASSIFICAÇÃO">
        <template #text>
          <TextField v-model="name" label="NOME DA CLASSIFICAÇÃO" />
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            width="8vw"
            variant="flat"
            @click="
              async () => {
                await create();

                isActive.value = false;
              }
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
