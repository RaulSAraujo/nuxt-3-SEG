<script setup lang="ts">
const { $customFetch } = useNuxtApp();

const { capitalizeFirstLetter } = useCapitalize();

interface UpdateOrders {
  deleted: number;
  message: string;
  saved: number;
}

const updateOrders = async () => {
  try {
    const res = await $customFetch<UpdateOrders>(`shipping-urgency/update-orders`, {
      method: "POST",
    });

    $toast().info(
      `Total de pedidos atualizados: ${res.saved} | deletados: ${res.deleted}`
    );
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="FORÇAR SINCRONIZAÇÃO"
    style="
      --v-theme-surface-variant: 128, 0, 128;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-reload"
        style="color: purple"
        @click="updateOrders"
      />
    </template>
  </v-tooltip>
</template>
