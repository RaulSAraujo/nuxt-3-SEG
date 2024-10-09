<script setup lang="ts">
import type { Row } from "~/interfaces/OrdersMl";
interface Form {
  tracking_code: string;
  description: string;
  finality: string;
  quantity_purchase: number;
  review_data: string | null;
  limit_date: string | null;
  seller: string;
  total_cost: string;
  form_payment: null | string;
  observation: string;
}

const form = reactive<Form>({
  tracking_code: "",
  description: "",
  finality: "",
  quantity_purchase: 1,
  review_data: "",
  limit_date: "",
  seller: "",
  total_cost: "",
  form_payment: null,
  observation: "",
});

const payments_form = ["CCPJ", "CC PJ + MP", "MP", "BOLETO"];

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const { data } = useAuth();

const loading = useLoadingIndicator();

const { databaseDate } = useDateConversion();

const create = async () => {
  loading.start();

  form.review_data = databaseDate(form.review_data ?? "") || null;
  form.limit_date = databaseDate(form.limit_date ?? "") || null;

  try {
    const res = await useNuxtApp().$customFetch<Row>("orders-finality-stock-ml", {
      method: "POST",
      body: {
        ...form,
        status: "EM ABERTO",
        purchased_by: data.value?.name,
      },
    });

    $toast().success("Novo pedido mercado livre criado com sucesso.");

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
  form.tracking_code = "";
  form.description = "";
  form.finality = "";
  form.quantity_purchase = 1;
  form.review_data = "";
  form.limit_date = "";
  form.seller = "";
  form.total_cost = "";
  form.form_payment = null;
  form.observation = "";
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="500" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVO PEDIDO MERCADO LIVRE">
        <template #text>
          <v-row dense>
            <v-col cols="6">
              <TextField v-model="form.tracking_code" label="Nº PEDIDO" />
            </v-col>

            <v-col cols="6">
              <TextField v-model="form.finality" label="FINALIDADE" />
            </v-col>

            <v-col cols="12">
              <TextField v-model="form.description" label="DESCRIÇÃO" />
            </v-col>

            <v-col cols="12">
              <NumberInput v-model="form.quantity_purchase" label="QUANTIDADE" />
            </v-col>

            <v-col cols="6">
              <DatePicker
                v-model="form.review_data"
                label="DATA DE REVISÃO"
                :clearable="false"
                :multiple="false"
                @save="form.review_data = $dayjs($event).format('DD/MM/YYYY')"
              />
            </v-col>

            <v-col cols="6">
              <DatePicker
                v-model="form.limit_date"
                label="DATA LIMITE"
                :clearable="false"
                :multiple="false"
                @save="form.limit_date = $dayjs($event).format('DD/MM/YYYY')"
              />
            </v-col>

            <v-col cols="12">
              <TextField v-model="form.seller" label="VENDEDOR" />
            </v-col>

            <v-col cols="6">
              <CurrencyField v-model="form.total_cost" label="CUSTO TOTAL" />
            </v-col>

            <v-col cols="6">
              <Select
                v-model="form.form_payment"
                label="FORMA DE PAGAMENTO"
                :items="payments_form"
              />
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
