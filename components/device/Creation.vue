<script setup lang="ts">
import type { Row } from "~/interfaces/Apparatus.js";
import type { Row as RowClassification } from "~/interfaces/ClassificationApparatus.js";

defineProps<{
  classificationItems: RowClassification[];
}>();

const emit = defineEmits(["close"]);

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

    close();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  form.apparatus_name = "";
  form.classification_active = null;

  emit("close");
};
</script>

<template>
  <v-dialog width="260px" persistent>
    <v-card rounded="xl" title="NOVO APARELHO">
      <template #text>
        <TextField v-model="form.apparatus_name" label="NOME DO APARELHO" />
        <Select
          v-model="form.classification_active"
          label="CLASSIFICAÇÃO"
          :items="classificationItems"
          item-title="name"
          item-value="id"
          :multiple="false"
          :return-object="true"
        />
      </template>

      <template #actions>
        <v-btn color="error" text="FECHAR" @click="close" />
        <v-btn color="primary" text="SALVAR" @click="create" />
      </template>
    </v-card>
  </v-dialog>
</template>
