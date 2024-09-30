<script setup lang="ts">
import type { SalesOrder, Row } from "~/interfaces/SalesOrder.js";

useHead({
  titleTemplate: `Novo romaneio - %s`,
});

const shipment = ref();

const { $customFetch } = useNuxtApp();

const salesOrder = ref<Row[]>([]);

const loading = ref(false);

const fetchItems = async () => {
  if (!shipment.value) {
    return $toast().error("Informe uma transportadora.");
  }

  loading.value = true;

  const res = await $customFetch<SalesOrder>("sales-order", {
    query: {
      status: "EMBALADO;GERADO MANUAL ETIQUETA;GERADO MANUAL FISCAL",
      collected: false,
      canceled: false,
      sales_collection_id: "empty",
      collect_company: shipment.value,
    },
  });

  salesOrder.value = [];
  res.rows.forEach((e) => {
    const duplicated = salesOrder.value.some((r) => e.sale_id === r.sale_id);

    if (!duplicated) {
      salesOrder.value.push(e);
    }
  });

  loading.value = false;
};
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="`Voltar para romaneio`"
        :to="{
          name: 'expedition-romaneio',
        }"
      />
    </div>

    <v-sheet rounded="lg">
      <v-toolbar title="NOVO ROMANEIO" rounded="t-lg">
        <template #append>
          <span class="text-body-2 mr-2">{{ salesOrder.length }} PEDIDOS EMBALADOS</span>
        </template>
      </v-toolbar>

      <v-row dense class="my-2">
        <v-col cols="12" sm="12" md="3" lg="3" xl="2">
          <RomaneioShipment v-model="shipment" />
        </v-col>
        <v-col>
          <RomaneioInputRemove :items="salesOrder" />
        </v-col>
        <v-col cols="3" class="d-flex justify-end">
          <v-btn
            text="PESQUISAR"
            color="primary"
            class="mr-3"
            :loading="loading"
            @click="fetchItems"
          />
        </v-col>
      </v-row>

      <RomaneioTable :items="salesOrder" />
    </v-sheet>

    <RomaneioButtonCreation
      :items="salesOrder"
      :collect-company="shipment ?? ''"
      :quantity-orders="salesOrder.length ?? 0"
      @clear="salesOrder = []"
    />
  </div>
</template>
