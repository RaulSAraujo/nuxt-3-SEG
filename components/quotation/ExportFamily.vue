<script setup lang="ts">
interface FistStep {
  result: {
    file: string;
    result: object;
  };
  success: boolean;
}

const file = ref([]);

const code = ref("ProdutoChave");
const codeName = ref([
  { text: "Produto chave", value: "ProdutoChave" },
  { text: "Cóigo. erp", value: "ERPCode" },
  { text: "Código fábricante", value: "FabCode" },
]);

const loading = ref(false);

const filePath = ref("");

const extract = async () => {
  loading.value = true;

  const formData = new FormData();
  formData.append("file", file.value[0]);
  formData.append("codeName", code.value);

  try {
    const res = await useNuxtApp().$customFetch<FistStep>("quotation/first-step", {
      method: "POST",
      body: formData,
    });

    filePath.value = res.result.file;

    $toast().success("Sucesso em extrair os codigos.");

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.value = false;
  }
};

const close = () => {
  file.value = [];
  filePath.value = "";
  code.value = "ProdutoChave";
};
</script>

<template>
  <v-dialog width="35vw" @after-leave="close">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="1º EXTRAIR CÓD.FAB FAMILIA"
        color="primary"
        class="mr-2"
      />
    </template>

    <template #default>
      <v-card title="1º EXTRAIR CÓD.FAB FAMILIA" rounded="xl">
        <template #subtitle>
          <v-btn
            text="Baixe o exemplo aqui"
            variant="plain"
            size="x-small"
            color="primary"
            target="_blank"
            :href="`${$config.public.base_url_local}/files/sheets/arquivo-extrair-mesma-familia.xlsx`"
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

          <v-select
            v-model="code"
            label="Selecione o tipo de código"
            color="primary"
            :items="codeName"
            item-title="text"
            item-value="value"
          />

          <div class="d-flex justify-space-around">
            <v-btn
              color="primary"
              text="EXTRAIR CÓDIGOS"
              :loading="loading"
              @click="extract"
            />

            <v-btn
              text="CÓDIGOS.XLSX"
              :color="filePath.length === 0 ? 'black' : 'primary'"
              :disabled="filePath.length === 0"
              target="_blank"
              :href="`${$config.public.base_url_local}${filePath}`"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
