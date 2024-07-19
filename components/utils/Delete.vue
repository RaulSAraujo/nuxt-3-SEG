<script setup lang="ts">
const props = defineProps<{
  urlLocal?: string | null;
  id: number;
}>();

const { url } = useTableStore();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

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
      props.urlLocal ?? url,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deletar dados</div>

    <p class="text-caption text-grey-lighten-2">Não será possivel recuperar, deseja continuar ?</p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
