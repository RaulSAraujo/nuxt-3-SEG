<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

interface Items {
  quantity_purchased: number;
  quantity_reserved: number;
  name: string;
  description: string;
  cost: number | string;
  reservation: string;
  sending_limit_at: string;
}

onBeforeRouteLeave(() => {
  clear();
});

const refFindServer = ref();
const product = ref<Row>();

const form = reactive({
  quantity_purchased: 1,
  quantity_reserved: 1,
  cost: 0.0,
  reservation: "",
  sending_limit_at: "",
});

const dayjs = useDayjs();

const items = ref<Items[]>([]);
const add = () => {
  items.value.push({
    ...form,
    name: product.value!.name ?? "",
    description: product.value!.description ?? "",
  });

  clear();
};

const clear = () => {
  form.quantity_purchased = 1;
  form.quantity_reserved = 1;
  form.cost = 0.0;
  form.reservation = "";
  form.sending_limit_at = "";

  product.value = undefined;
  refFindServer.value.clear();
};
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para solicitação de compra"
        :to="{
          name: 'purchase-request',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-toolbar title="NOVA SOLICITAÇÃO DE COMPRA" rounded="t-xl" class="mb-5" />

      <v-row dense justify="space-between" class="px-3 mb-2">
        <v-col cols="12" md="4" lg="3">
          <PurchaseRequestFindServer ref="refFindServer" @change="product = $event" />
        </v-col>
        <v-col cols="6" md="4" lg="1">
          <NumberInput
            v-model="form.quantity_purchased"
            label="Quantidade comprada"
            :min="1"
          />
        </v-col>
        <v-col cols="6" md="4" lg="1">
          <NumberInput
            v-model="form.quantity_reserved"
            label="Quantidade finalidade"
            :min="1"
          />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <TextField v-model="form.reservation" label="Finalidade" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <CurrencyField v-model="form.cost" label="Custo fornecedor" />
        </v-col>
        <v-col cols="12" md="4" lg="2">
          <DatePicker
            v-model="form.sending_limit_at"
            label="Data limite"
            :multiple="false"
            :clearable="true"
            @save="form.sending_limit_at = dayjs($event).format('DD/MM/YYYY')"
          />
        </v-col>
      </v-row>

      <div class="d-flex justify-end mr-3">
        <v-btn
          text="ADICIONAR"
          variant="flat"
          color="primary"
          class="mr-1"
          @click="add"
        />

        <v-btn
          text="REDEFINIR"
          variant="outlined"
          color="primary"
          class="ml-1"
          @click="clear"
        />
      </div>

      <PurchaseRequestTable :items="items" />
    </v-sheet>
  </div>
</template>
