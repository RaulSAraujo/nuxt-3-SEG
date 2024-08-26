<script setup lang="ts">
import type { Row } from "~/interfaces/Supplier.js";

const emit = defineEmits(["close"]);

interface Body {
  name: string;
  active: boolean;
  lead_time: string | number;
  virtual_quantity: string | number;
}

const supplier = reactive<Body>({
  name: "",
  active: true,
  lead_time: "",
  virtual_quantity: "",
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<Row>("supplier", {
      method: "POST",
      body: {
        name: supplier.name.toUpperCase(),
        active: supplier.active,
        lead_time: supplier.lead_time,
        virtual_quantity: supplier.virtual_quantity,
      },
    });

    $toast().success("Novo fornecedor criado.");

    close();

    items.value.splice(0, 0, res);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  supplier.name = "";
  supplier.lead_time = "";
  supplier.virtual_quantity = "";
};
</script>

<template>
  <v-dialog width="260px" @after-leave="close">
    <v-card rounded="xl" title="NOVO FORNECEDOR">
      <template #text>
        <TextField v-model="supplier.name" label="NOME DO FORNECEDOR" class="mb-2" />
        <TextField v-model="supplier.lead_time" label="LEAD TIME" class="mb-2" />
        <TextField v-model="supplier.virtual_quantity" label="QUANTIDADE VIRTUAL" />
      </template>

      <template #actions>
        <v-spacer />
        <v-btn
          color="primary"
          text="SALVAR"
          variant="flat"
          width="13vw"
          @click="create"
        />
        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
