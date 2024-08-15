<script setup lang="ts">
import type { Row } from "~/interfaces/Pstatus.js";

const props = defineProps<{
  items: Row[];
}>();

defineEmits(["isActive"]);

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const StatusItems = computed(() => props.items);

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

const loading = useLoadingIndicator();

const dayjs = useDayjs();

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
  <v-btn
    text="SALVAR"
    color="blue"
    @click="
      update();

      $emit('isActive');
    "
  />
</template>
