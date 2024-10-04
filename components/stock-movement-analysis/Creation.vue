<script setup lang="ts">
const file = ref();

const loading = ref(false);

const { $customFetch } = useNuxtApp();

const { capitalizeFirstLetter } = useCapitalize();

const importationOfAnalysis = async () => {
  loading.value = true;

  try {
    const formData = new FormData();
    formData.append("monthlySales", file.value);

    await $customFetch("stock-movement-analysis/sales-analysis", {
      method: "POST",
      body: formData,
    });

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};

const close = () => {
  file.value = undefined;
};
</script>

<template>
  <v-dialog width="35vw" @after-leave="close">
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="IMPORTAR" color="primary" class="mr-2" />
    </template>

    <template #default="{ isActive }">
      <v-card title="IMPORTAÇÃO DE ANALISE DE MOVIMENTAÇÃO" rounded="xl">
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

          <div class="d-flex justify-space-around">
            <v-btn
              text="IMPORTAR"
              color="primary"
              :disabled="file == undefined"
              :loading="loading"
              @click="
                async () => {
                  await importationOfAnalysis();

                  isActive.value = false;
                }
              "
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
