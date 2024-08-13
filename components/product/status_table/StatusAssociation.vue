<script setup lang="ts">
import type { Pstatus, Row } from "~/interfaces/Pstatus.js";

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const { data, status } = $api<Pstatus>("pstatus", {
  key: "PstatusList",
  lazy: true,
  pick: ["rows"],
});

const StatusItems = ref<Row[]>();

if (status.value === "success") {
  StatusItems.value = useSorted(data.value!.rows, (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;

    return 0;
  }).value;

  StatusItems.value!.forEach((element) => {
    const find = product.value?.Pstatuses!.find((item) => {
      return element.id === item.id;
    });

    element.active = !!find;
  });
}

const loading = useLoadingIndicator();

const dayjs = useDayjs();

const update = async () => {
  loading.start();

  if (!StatusItems.value) return;

  const activeStatus = useArrayFilter(StatusItems.value, (f) => f.active === true);

  const mapActiveStatus = useArrayMap(activeStatus, (f) => f.id);

  const activeProblemStatus = useArrayFindIndex(
    StatusItems.value,
    (f) => f.active == true && f.name == "Problema"
  );

  if (activeProblemStatus.value > -1 && product.value!.availability !== 6) {
    const { success, message } = await quotationStatusBloqueado();

    if (!success) return $toast().error(message);
  }

  try {
    await useNuxtApp().$customFetch("product", {
      method: "PUT",
      body: {
        id: product.value?.id,
        pstatuses: mapActiveStatus.value,
      },
    });

    const statusList = activeStatus.value.map((f) => {
      return {
        id: f.id,
        active: f.active,
        name: f.name,
        ProductPstatus: {
          id: 0,
          product_id: product.value?.id ?? 0,
          pstatus_id: f.id,
          created_at: dayjs().format(),
          updated_at: dayjs().format(),
        },
        created_at: f.created_at,
        updated_at: f.updated_at,
      };
    });

    product.value!.Pstatuses = statusList;

    if (activeProblemStatus.value > -1 && product.value!.availability !== 6) {
      product.value!.availability = 6;

      $toast().success("Sucesso ao salvar, Produto alterado para o status bloqueado.");
    }
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }

  loading.finish();
};

const quotationStatusBloqueado = async () => {
  return await useNuxtApp().$customFetch<{ message: string; success: boolean }>(
    "quotation",
    {
      method: "POST",
      body: [
        {
          product_id: product.value!.id,
          supplier_id: product.value!.supplier_preference_id,
          name: product.value!.name,
          availability: 6,
          filepath: "/",
          filename: "",
          lead_time: product.value!.lead_time,
          cost: product.value!.cost,
          active: product.value!.active,
          virtual_quantity: product.value!.virtual_quantity,
        },
      ],
    }
  );
};
</script>

<template>
  <v-dialog
    v-if="status === 'success'"
    transition="dialog-top-transition"
    width="400"
    persistent
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="pink"
        text="EDITAR STATUS"
        variant="outlined"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="STATUS ASSOCIADOS" rounded="xl">
        <v-card-text class="mt-5">
          <v-virtual-scroll
            :items="StatusItems"
            height="50vh"
            item-height="60"
            style="
              overflow: auto;
              --width-scrollbar: 5px;
              --track-color: rgba(0, 0, 0, 0);
              --thumb-color: #8080804d;
              --border-color: rgba(0, 0, 0, 0);
              --track-color-hover: #808080a3;
            "
            class="px-1"
          >
            <template #default="{ item, index }">
              <v-list-item :title="`${item.id}.${item.name}`">
                <template #append>
                  <v-btn
                    :text="item.active ? 'Remover' : 'Adicionar'"
                    :color="item.active ? 'red' : 'blue'"
                    variant="plain"
                    size="small"
                    @click="item.active = !item.active"
                  />
                </template>
              </v-list-item>

              <v-divider v-if="(index + 1) != StatusItems!.length" />
            </template>
          </v-virtual-scroll>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn text="FECHAR" color="red" @click="isActive.value = false" />
          <v-btn
            text="SALVAR"
            color="blue"
            @click="
              update();
              isActive.value = false;
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
