<script setup lang="ts">
import type { Row } from "~/interfaces/ClassificationApparatus.js";

const emit = defineEmits(["close"]);

interface Body {
  name: string;
}

const form = reactive<Body>({
  name: "",
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<Row>("classification-apparatus", {
      method: "POST",
      body: {
        name: form.name,
      },
    });

    $toast().success("Novo aparelho criado.");

    items.value.splice(0, 0, {
      ...res,
    });

    close();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  form.name = "";

  emit("close");
};
</script>

<template>
  <v-dialog width="260px" persistent>
    <v-card rounded="xl" title="NOVA CLASSIFICAÇÃO">
      <template #text>
        <TextField v-model="form.name" label="NOME DA CLASSIFICAÇÃO" />
      </template>

      <template #actions>
        <v-btn color="error" text="FECHAR" @click="close" />
        <v-btn color="primary" text="SALVAR" @click="create" />
      </template>
    </v-card>
  </v-dialog>
</template>
