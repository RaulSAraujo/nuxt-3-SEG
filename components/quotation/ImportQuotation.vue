<script setup lang="ts">
import type { Supplier, Row } from "~/interfaces/Supplier.js";

const file = ref([]);

const supplier = ref();

const { data } = $api<Row[]>("supplier", {
  key: "SupplierList",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return ((fetchData as unknown) as Supplier).rows;
  },
});

const loading = ref(false);

const quotation = async () => {
  loading.value = true;

  await useNuxtApp().$customFetch(
    "quotation-pack?sort-field[]=id&sort-type[]=desc&applied=false&canceled=false",
    {
      timeout: 20000,
    }
  );

  const formData = new FormData();
  formData.append("file", file.value[0]);
  formData.append("supplier", supplier.value);

  try {
    await useNuxtApp().$customFetch("quotation/second-step", {
      method: "POST",
      body: formData,
    });

    $toast().success("Operação finalizada.");

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.value = false;
  }
};

const close = () => {
  file.value = [];
  supplier.value = undefined;
};
</script>

<template>
  <v-dialog width="35vw" @after-leave="close">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="2º IMPORTAR COTAÇÃO"
        color="primary"
        class="mr-2"
      />
    </template>

    <template #default>
      <v-card title="2º IMPORTAR COTAÇÃO">
        <template #subtitle>
          <v-btn
            text="Baixe o exemplo aqui"
            variant="plain"
            size="x-small"
            color="primary"
            target="_blank"
            :href="`${$config.public.base_url_local}/files/sheets/arquivo-importar-cotacao.xlsx`"
          />
        </template>

        <v-card-text>
          <v-file-input
            v-model="file"
            color="primary"
            label="Arquivo com códigos na 1º coluna"
            accept=".csv,.xlsx,.xls,.xlsb"
            placeholder="Selecione seu arquivo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
          />

          <v-combobox
            v-model="supplier"
            label="Selecione o fornecedor"
            color="primary"
            :items="data ?? []"
            item-title="name"
            item-value="id"
            :return-object="false"
          />

          <div class="d-flex justify-space-around">
            <v-btn
              text="SALVAR COTAÇÃO"
              color="primary"
              :disabled="file.length === 0 || supplier === undefined"
              :loading="loading"
              @click="quotation"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
