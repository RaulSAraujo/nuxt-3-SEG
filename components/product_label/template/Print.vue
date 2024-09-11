<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const loading = useLoadingIndicator();

const reprint = async () => {
  loading.start();

  try {
    const res = await useNuxtApp().$customFetch<{ message: string }>(
      `stock-tag-control/reprint?id=${props.id}`
    );

    $toast().success(res.message);

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="Reimprimir etiqueta"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-printer"
        variant="plain"
        color="primary"
        size="small"
        density="comfortable"
        @click="snackbar = true"
      />
    </template>
  </v-tooltip>

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="blue"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deseja reimprimir esta etiqueta ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="reprint"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
