<script setup lang="ts">
import type { Row } from "~/interfaces/Insumos";

interface Form {
  description: string;
  finality: string;
  quantity_purchase: number;
  observation: string;
}

const form = reactive<Form>({
  description: "",
  finality: "",
  quantity_purchase: 1,
  observation: "",
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const { data } = useAuth();

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<Row>("input-materials", {
      method: "POST",
      body: {
        ...form,
        status: "EM ABERTO",
        requested_by: data.value?.name,
      },
    });

    $toast().success("Novo pedido de insumo criado com sucesso.");

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
  form.description = "";
  form.finality = "";
  form.quantity_purchase = 1;
  form.observation = "";
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="260px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVO INSUMO">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <TextArea v-model="form.description" label="DESCRIÇÃO" auto-grow />
            </v-col>

            <v-col cols="12">
              <TextField v-model="form.finality" label="FINALIDADE" />
            </v-col>

            <v-col cols="12">
              <NumberInput v-model="form.quantity_purchase" label="QUANTIDADE" />
            </v-col>

            <v-col cols="12">
              <TextField v-model="form.observation" label="OBSERVAÇÃO" />
            </v-col>
          </v-row>
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
