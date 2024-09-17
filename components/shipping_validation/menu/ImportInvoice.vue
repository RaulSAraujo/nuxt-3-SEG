<script setup lang="ts">
const file = ref();
const carrierName = ref();
const billNumber = ref("");

const carrierList = ref([
  { text: "TOTAL EXPRESS", value: "TOTALEXPRESS" },
  { text: "CORREIOS", value: "CORREIOS" },
  { text: "MANDAE", value: "MANDAE" },
  { text: "SMART ENVIOS", value: "SMARTENVIOS" },
  { text: "JADLOG", value: "JADLOG" },
]);

const loading = useLoadingIndicator();

const { $customFetch } = useNuxtApp();

const importCarrier = async () => {
  loading.start();

  const formData = new FormData();
  formData.append("carrierInvoice", file.value);

  try {
    const res = await $customFetch<{ message: string; success: boolean }>(
      "shipping-validation/carrier-invoice",
      {
        method: "POST",
        body: formData,
        query: {
          carrierName: carrierName.value,
          billNumber: billNumber.value || undefined,
        },
      }
    );

    $toast().success(res.message);

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-dialog width="30vw">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="IMPORTAÇÃO DE FATURA"
        style="
          --v-theme-surface-variant: 128, 0, 128;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeModels(tooltip, dialog)"
            icon="mdi-invoice-import"
            style="color: purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default="{ isActive }">
      <v-card title="IMPORTAÇÃO DE FATURA" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <v-file-input
                v-model="file"
                color="primary"
                label="Somente arquivos PDF, CSV, XLS, XLSX"
                accept=".csv,.xlsx,.xls,.pdf"
                placeholder="Selecione seu arquivo"
                prepend-inner-icon="mdi-paperclip"
                prepend-icon=""
              />
            </v-col>
            <v-col cols="6">
              <Select
                v-model="carrierName"
                label="Nome da transportadora"
                :items="carrierList"
                item-title="text"
                item-value="value"
                :clearable="true"
                :multiple="false"
              />
            </v-col>
            <v-col cols="6">
              <TextField v-model="billNumber" label="Número da nota (opcional)" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            text="IMPORTAR"
            width="13vw"
            style="background-color: rgb(34, 123, 212)"
            @click="
              importCarrier();
              isActive.value = false;
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
