<script setup lang="ts">
import type { Row } from "~/interfaces/Apparatus.js";
import type { Row as RowClassification } from "~/interfaces/ClassificationApparatus.js";

defineProps<{
  classificationItems: RowClassification[];
}>();

interface Body {
  apparatus_name: string;
  classification_active: RowClassification | null;
}

const form = reactive<Body>({
  apparatus_name: "",
  classification_active: null,
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<Row>("apparatus", {
      method: "POST",
      body: {
        apparatus_name: form.apparatus_name,
        classification_apparatus_id: form.classification_active?.id,
      },
    });

    $toast().success("Novo aparelho criado.");

    items.value.splice(0, 0, {
      ...res,
      ClassificationApparatu: {
        name: form.classification_active?.name,
      },
    });
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  form.apparatus_name = "";
  form.classification_active = null;
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="260px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVO APARELHO">
        <template #text>
          <TextField
            v-model="form.apparatus_name"
            label="NOME DO APARELHO"
            class="mb-3"
          />
          <Select
            v-model="form.classification_active"
            label="CLASSIFICAÇÃO"
            :items="classificationItems"
            item-title="name"
            item-value="id"
            :multiple="false"
            :return-object="true"
            :clearable="true"
          />
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            class="mb-2"
            color="primary"
            width="8vw"
            variant="flat"
            text="SALVAR"
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
