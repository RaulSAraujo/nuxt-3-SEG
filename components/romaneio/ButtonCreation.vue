<script lang="ts" setup>
import type { User } from "~/interfaces/User";
import type { Row } from "~/interfaces/SalesOrder.js";
import type { SalesCollections } from "~/interfaces/SalesCollections.js";

const props = defineProps<{
  items: Row[];
  collectCompany: string;
  quantityOrders: number;
}>();

const emit = defineEmits(["clear"]);

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const { data } = useAuth();

const user = data.value as User;

const creation = async () => {
  if (!props.collectCompany) {
    return $toast().error("Informe uma transportadora.");
  }

  loading.value = true;

  let salesCollectionId = null;
  try {
    const { id } = await $customFetch<SalesCollections>("sales-collection", {
      method: "POST",
      body: {
        user: user.name,
        collect_company: props.collectCompany,
        quantity_orders: props.quantityOrders,
      },
    });

    salesCollectionId = id;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }

  for (const item of props.items) {
    try {
      await $customFetch(`sales-order?id=${item.id}`, {
        method: "PUT",
        body: {
          id: item.id,
          collected: true,
          sales_collection_id: salesCollectionId,
        },
      });
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);
    }
  }

  emit("clear");

  loading.value = false;
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    style="position: fixed; bottom: 105px; right: 60px"
    :loading="loading"
    @click="creation"
  />
</template>
