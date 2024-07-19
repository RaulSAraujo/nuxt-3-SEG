<script setup lang="ts">
defineEmits(["disable"]);

const dayjs = useDayjs();

const productStore = useProductStore();
const { product, costTableIndex, availabilityMap } = storeToRefs(productStore);

const { supplierItems } = useSupplierStore();

const loading = ref<boolean>(false);

const cost_at = computed(
  () => product.value?.Quotations[costTableIndex.value]?.cost_at ?? ""
);

const availability_at = computed(
  () => product.value?.Quotations[costTableIndex.value]?.availability_at ?? ""
);

if (cost_at.value && dayjs(cost_at.value).isValid()) {
  product.value!.Quotations[costTableIndex.value].cost_at = dayjs(cost_at.value).format(
    "DD/MM/YYYY"
  );
}

if (availability_at.value && dayjs(availability_at.value).isValid()) {
  product.value!.Quotations[costTableIndex.value].availability_at = dayjs(
    availability_at.value
  ).format("DD/MM/YYYY");
}

const costChanged = ref<boolean>(false);

const ChangeDateAndAvailabilityDate = () => {
  product.value!.Quotations[costTableIndex.value].availability_at = dayjs().format(
    "DD/MM/YYYY"
  );

  product.value!.Quotations[costTableIndex.value].cost_at = dayjs().format("DD/MM/YYYY");

  costChanged.value = true;
};

const updateQuotation = async () => {
  if (!product.value) return;

  loading.value = true;

  const quotation = { ...product.value?.Quotations[costTableIndex.value] };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete quotation.Supplier

  quotation.cost_at = dayjs(quotation.cost_at, "DD/MM/YYYY").format("YYYY-MM-DD");
  quotation.availability_at = dayjs(quotation.availability_at, "DD/MM/YYYY").format(
    "YYYY-MM-DD"
  );

  try {
    await useNuxtApp().$customFetch("quotation", {
      method: 'POST',
      body: [
        {
          ...quotation,
          name: product.value.name,
          enable_cost_date: costChanged.value,
        },
      ],
      timeout: 60000,
    });

    $toast().success("Sucesso em atualizar a cotação.");

    loading.value = false;
  } catch (error) {
    loading.value = false;

    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }
};
</script>

<template>
  <v-dialog
    :retain-focus="false"
    width="80%"
    persistent
    no-click-animation
    content-class="rounded-xl"
    transition="dialog-top-transition"
  >
    <v-sheet class="rounded-xl">
      <v-container>
        <div class="d-flex flex-row">
          <span class="text-h5 blue white--text">
            EDITAR TABELA DE CUSTO ID.{{ product?.Quotations[costTableIndex].id }}
          </span>

          <v-spacer />

          <v-btn icon="mdi-close" variant="plain" @click="$emit('disable')" />
        </div>

        <v-row dense>
          <v-col cols="6" sm="4" md="3" lg="3">
            <TextField
              v-model="product!.name"
              label="COD. FABRICANTE"
              :disabled="true"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="4" md="2" lg="3">
            <Combobox
              v-model="product!.Quotations[costTableIndex].supplier_id"
              label="FORNECEDOR"
              :items="supplierItems ?? []"
              item-title="name"
              item-value="id"
              :hide-details="true"
              :multiple="false"
            />
          </v-col>

          <v-col cols="3" sm="4" md="2" lg="2">
            <v-tooltip location="top" color="blue">
              <template #activator="{ props }">
                <CurrencyField
                  v-model="product!.Quotations[costTableIndex].cost"
                  v-bind="props"
                  label="PREÇO"
                  :hide-details="true"
                  @update:model-value="ChangeDateAndAvailabilityDate"
                />
              </template>
              <span>Ao alterar atualizará a data de custo e disponibilidade</span>
            </v-tooltip>
          </v-col>

          <v-col cols="3" sm="2" md="2" lg="1">
            <TextField
              v-model="product!.Quotations[costTableIndex].lead_time"
              label="LEAD TIME"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="5" md="3" lg="3">
            <Select
              v-model="product!.Quotations[costTableIndex].availability"
              label="DISPONIBILIDADE"
              :items="availabilityMap"
              item-title="title"
              item-value="value"
              :multiple="false"
              @update:model-value="product!.Quotations[costTableIndex].availability_at = $dayjs().format('DD/MM/YYYY')"
            />
          </v-col>

          <v-col cols="6" sm="5" md="2" lg="3">
            <DatePicker
              v-model="product!.Quotations[costTableIndex].cost_at"
              label="DATA ALTERAÇÃO DE CUSTO"
              :clearable="false"
              :multiple="false"
              @save="product!.Quotations[costTableIndex].cost_at = $dayjs($event).format('DD/MM/YYYY')"
            />
          </v-col>

          <v-col cols="6" sm="5" md="2" lg="3">
            <DatePicker
              v-model="product!.Quotations[costTableIndex].availability_at"
              label="DATA ALTERAÇÃO DE DISPONIBILIDADE"
              :clearable="false"
              :multiple="false"
              @save="product!.Quotations[costTableIndex].availability_at = $dayjs($event).format('DD/MM/YYYY')"
            />
          </v-col>

          <v-col cols="6" sm="4" md="3" lg="3">
            <Switch
              v-model="product!.Quotations[costTableIndex].active"
              class="d-flex flex-row justify-center border-sm rounded-lg mx-1"
              label="COT. ATIVA"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="4" md="3" lg="3">
            <TextField
              v-model="product!.Quotations[costTableIndex].virtual_quantity"
              label="ESTOQUE VIRTUAL"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="12" md="12" lg="12">
            <TextArea
              v-model="product!.Quotations[costTableIndex].observation"
              label="OBSERVAÇÃO"
              :auto-grow="true"
              :hide-details="true"
            />
          </v-col>
        </v-row>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            variant="text"
            :loading="loading"
            @click="updateQuotation"
          >
            SALVAR
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
