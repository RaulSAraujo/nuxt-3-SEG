<script setup lang="ts">
import type { ShipmentOrders } from "~/interfaces/ShipmentOrders.js";

const type = ref();

const file = ref();

const step = ref(1);

const { $customFetch } = useNuxtApp();

const typeFile = computed(() => {
  if (type.value == "DC") return ".pdf";
  if (type.value == "XML") return ".xml";
  if (type.value == "TAG") return ".pdf";

  return "";
});

const disabled = computed(() => {
  if (step.value == 1) {
    if (type.value == undefined) return true;

    return "prev";
  }

  if (step.value == 2) {
    if (type.value == "TAG") {
      if (file.value == undefined || shippingSelection.value == undefined) {
        return "next";
      }
    } else {
      if (file.value == undefined) {
        return "next";
      }
    }
  }

  if (step.value === 3) {
    return "next";
  }

  return undefined;
});

const shippingSelection = ref();

const shipmentOrders = ref<string[]>([]);
if (shipmentOrders.value.length == 0) {
  const shipmentRes = await $customFetch<ShipmentOrders>(`shipment-orders`);
  const uniqueCompanies = shipmentRes.rows.map((shipment) =>
    shipment.shipment_mode?.toUpperCase()
  );

  shipmentOrders.value.push(...uniqueCompanies);
}

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const upload = async () => {
  loading.value = true;

  const formData = new FormData();
  formData.append("file", file.value);

  try {
    await $customFetch(`sales-order/upload-pdf`, {
      method: "POST",
      params: {
        type: type.value,
        new_shipping: ["", null, undefined].includes(shippingSelection.value)
          ? undefined
          : shippingSelection.value,
      },
      body: formData,
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }

  loading.value = false;
};

watch(
  () => type.value,
  () => {
    file.value = undefined;

    shippingSelection.value = undefined;
  }
);
</script>

<template>
  <v-card title="UPLOAD DE ARQUIVOS" rounded="xl">
    <template #default>
      <v-stepper
        v-model="step"
        :items="['Tipo de arquivo', 'Upload do Arquivo', 'Finalizar']"
      >
        <template #item.1>
          <v-card title="Tipo de arquivo" flat>
            <v-radio-group v-model="type" color="primary">
              <v-radio label="Declaração (.pdf)" value="DC" />
              <v-radio label="Nota fiscal (.xml)" value="XML" />
              <v-radio label="Etiqueta transportadora (.pdf)" value="TAG" />
            </v-radio-group>
          </v-card>
        </template>

        <template #item.2>
          <v-card title="Upload do Arquivo" flat>
            <v-combobox
              v-show="type == 'TAG'"
              v-model="shippingSelection"
              label="Envio"
              :items="shipmentOrders ?? []"
              hide-details
              class="mb-2"
            />

            <v-file-input
              v-model="file"
              color="primary"
              label="Selecione seu arquivo"
              :accept="typeFile"
              prepend-inner-icon="mdi-paperclip"
              prepend-icon=""
            />
          </v-card>
        </template>

        <template #item.3>
          <v-card title="Finalizar" flat>
            <v-btn
              base-color="primary"
              variant="plain"
              block
              size="160px"
              :loading="loading"
              @click="upload"
            >
              <template #default>
                <div class="d-flex flex-column justify-center align-center">
                  <v-icon icon="mdi-upload-network" size="100px" color="primary" />
                  <span>CLICK AQUI PARA SUBIR O ARQUIVO</span>
                </div>
              </template>
            </v-btn>
          </v-card>
        </template>

        <template #actions="{ prev, next }">
          <v-stepper-actions
            :disabled="disabled"
            color="primary"
            @click:next="next"
            @click:prev="prev"
          />
        </template>
      </v-stepper>
    </template>
  </v-card>
</template>
