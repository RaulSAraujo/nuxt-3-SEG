<script setup lang="ts">
const file = ref();

const loading = ref(false);

const loadingIndicator = useLoadingIndicator();

const quotation = async () => {
  loading.value = true;

  await useNuxtApp().$customFetch(
    "quotation-pack?sort-field[]=id&sort-type[]=desc&applied=false&canceled=false",
    {
      timeout: 20000,
    }
  );

  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const res = await useNuxtApp().$customFetch<{ filePath: string }>(
      "quotation/persist-second-step",
      {
        method: "POST",
        body: formData,
      }
    );

    const { token } = useAuth();

    const baseUrl = getBaseUrl();

    const eventSource = new EventSource(
      `${baseUrl}/quotation/second-step?authorization=${token.value}&path=${res?.filePath}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message.length > 0) {
        $toast().info(data.message);
      }

      if (data.percentage) {
        loadingIndicator.set(parseFloat(data.percentage));
      }

      if (data.message == "Importação finalizada") {
        loadingIndicator.finish();

        eventSource.close();
      }
    };

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.value = false;
  }
};

const getBaseUrl = () => {
  const req = useRequestHeaders(["host"]);

  const host = req.host || window.location.hostname;

  let baseURL = useNuxtApp().$config.public.base_url_local as string;
  if (host.includes("ddns")) {
    baseURL = useNuxtApp().$config.public.base_url_external as string;
  }

  return baseURL;
};

const close = () => {
  file.value = undefined;
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

    <template #default="{ isActive }">
      <v-card title="2º IMPORTAR COTAÇÃO" rounded="xl">
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

          <div class="d-flex justify-space-around">
            <v-btn
              text="SALVAR COTAÇÃO"
              color="primary"
              :disabled="file == undefined"
              :loading="loading"
              @click="
                async () => {
                  await quotation();

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
