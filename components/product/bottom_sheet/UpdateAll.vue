<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

const productStore = useProductStore();
const { availabilityMap } = storeToRefs(productStore);

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const form = reactive({
  availability: undefined,
  availability_at: "",
  lead_time: "",
  virtual_quantity: "",
});

const loading = useLoadingIndicator();

const update = async () => {
  if (selected.value.length === 0) {
    $toast().error("Nenhum produto selecionado.");

    return;
  }

  loading.start();

  for (let i = 0; i < selected.value.length; i++) {
    const select = selected.value[i] as Row;

    try {
      await useNuxtApp().$customFetch(`quotation`, {
        method: "POST",
        params: {
          id: select.id,
        },
        body: [
          {
            ...form,
            supplier_id: select.supplier_preference_id,
            name: select?.name,
            enable_cost_date: false,
          },
        ],
      });
    } catch (error) {
      const err = error as { statusText: string; message: string };

      $toast().error(`${err.statusText ?? err.message}`);
    }
  }

  loading.finish();

  $toast().success("Atualização finalizada.");
};
</script>

<template>
  <v-dialog width="30vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        text="Atualização em massa"
        prepend-icon="mdi-update"
        stacked
        style="color: rgb(103, 58, 183)"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="ATUALIZAR SELECIONADOS" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <Select
                v-model="form.availability"
                label="Disponibilidade"
                :items="availabilityMap"
                item-title="title"
                item-value="value"
                :multiple="false"
              />
            </v-col>
            <v-col cols="12">
              <DatePicker
                v-model="form.availability_at"
                label="Data alteração de dispobilidade"
                :clearable="false"
                :multiple="false"
                @save="form.availability_at = $dayjs($event).format('DD/MM/YYYY')"
              />
            </v-col>
            <v-col cols="12">
              <TextField v-model="form.lead_time" label="Lead time" />
            </v-col>
            <v-col cols="12">
              <TextField v-model="form.virtual_quantity" label="Estoque virtual" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            text="ATUALIZAR"
            width="13vw"
            style="background-color: rgb(34, 123, 212)"
            @click="
              update();
              isActive.value = false;
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
