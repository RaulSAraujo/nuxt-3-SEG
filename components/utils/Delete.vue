<script setup lang="ts">
const props = defineProps<{
  url?: string | null;
  id: number;
}>();

const { url } = useTableStore();

const snackbar = ref<boolean>(false);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const destroy = async () => {
  snackbar.value = false;

  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await useNuxtApp().$customFetch<Response>(
      props.url ?? url,
      {
        method: "DELETE",
        params: {
          id: props.id,
        },
      }
    );

    if (!success) return $toast().error(message);

    $toast().success(message);

    const index = useArrayFindIndex(
      items.value,
      (e: Record<string, any>) => e.id == props.id
    );

    items.value.splice(index.value, 1);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    variant="plain"
    size="small"
    color="pink"
    @click="snackbar = true"
  />

  <v-snackbar
    v-model="snackbar"
    vertical
    rounded="lg"
    :timeout="-1"
    variant="flat"
    color="surface"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deletar dados</div>

    <p class="text-caption text-grey">
      Não será possivel recuperar, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="primary" variant="text" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="primary" variant="text" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
