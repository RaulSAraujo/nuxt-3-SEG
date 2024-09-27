<script setup lang="ts">
import type { Row } from "~/interfaces/CarrierCutTime.js";

const form = reactive({
  company: undefined,
  collection: "",
  collection_time_from: "",
  collection_time_to: "",
  cutoff_time: "",
});

const companys = ref(["COMCLICK", "LOJADOTECNICO", "ORIGIPARTS", "VIZIOTECH"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<Row>("carrier-cut-time", {
      method: "POST",
      body: form,
    });

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
  form.company = undefined;
  form.collection = "";
  form.collection_time_from = "";
  form.collection_time_to = "";
  form.cutoff_time = "";
};
</script>

<template>
  <v-dialog width="280px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVO HORÁRIO">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <Select v-model="form.company" label="EMPRESA" :items="companys" />
            </v-col>
            <v-col cols="12">
              <TextField v-model="form.collection" v-maska="'#'" label="COLETA" />
            </v-col>
            <v-col cols="12">
              <TextField
                v-model="form.collection_time_from"
                v-maska="'##:##'"
                label="HORÁRIO DE COLETA INICIAL"
              />
            </v-col>
            <v-col cols="12">
              <TextField
                v-model="form.collection_time_to"
                v-maska="'##:##'"
                label="HORÁRIO DE COLETA FINAL"
              />
            </v-col>
            <v-col cols="12">
              <TextField
                v-model="form.cutoff_time"
                v-maska="'##:##'"
                label="HORÁRIO DE CORTE"
              />
            </v-col>
          </v-row>
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
