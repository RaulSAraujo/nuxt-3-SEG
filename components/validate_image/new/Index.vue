<script setup lang="ts">
import type { User } from "~/interfaces/User";

const emit = defineEmits(["push", "close"]);

const { data } = useAuthState();
const user = data.value as User;

interface Validate {
  name: string;
  status: string;
}

const validate = reactive<Validate>({
  name: "",
  status: "",
});

interface ValidateModels {
  id: number;
  name: string;
  status: string;
  user_id: number;
  product_id: number;
  updated_at: Date;
  created_at: Date;
  User: {
    id: number;
    name: string;
    username: string;
    active: boolean;
    is_admin: boolean;
    group_id: number;
    theme: boolean;
    top_menu: boolean;
    lateral_menu: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
  };
  success: boolean;
  message: string;
}

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const create = async () => {
  try {
    const res = await useNuxtApp().$customFetch<ValidateModels>(
      "validate-products-image",
      {
        method: "POST",
        body: {
          name: validate.name.toUpperCase(),
          status: validate.status,
          user_id: user.id,
        },
      }
    );

    $toast().success("Novo registro criado com sucesso.");

    emit("close");

    items.value.splice(0, 0, {
      ...res,
      observation: null,
      conclusion_date: null,
      deleted_at: null,
      Product: {},
    });
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }
};

const close = () => {
  validate.name = "";
  validate.status = "";
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="420px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVA SOLICITAÇÃO">
        <template #text>
          <v-text-field
            v-model="validate.name"
            clearable
            hide-details
            class="mb-2"
            color="primary"
            density="compact"
            variant="outlined"
            label="CODIGO DE FABRICANTE"
          />

          <div class="d-flex flex-row align-center">
            <span class="mr-3">SELECIONE A PRIORIDADE:</span>

            <ValidateImageNewRadioButton v-model="validate.status" />
          </div>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            variant="flat"
            width="10vw"
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
