<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

interface PartialFamily {
  id: number;
  name: string | null | undefined;
  erp_product_id: number | undefined;
  produto_chave: number | null | undefined;
  description: string | null | undefined;
  qtd_itens: number | null;
  quantity: number | null | undefined;
  virtual_quantity: number | null | undefined;
  lead_time: number | null | undefined;
  observation: string | null | undefined;
}

const kit = useState<PartialFamily[]>("KitProduct", () => []);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const route = useRoute();

const loading = useLoadingIndicator();

const destroy = async () => {
  snackbar.value = false;

  loading.start();

  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await useNuxtApp().$customFetch<Response>("kit", {
      method: "PUT",
      body: {
        id: parseInt(`${route.params.type_id}`),
        families: [],
        removeFamilies: [props.id],
      },
    });

    if (!success) return $toast().error(message);

    $toast().success(message);

    const index = useArrayFindIndex(kit, (e) => e.id == props.id);

    kit.value.splice(index.value, 1);

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    variant="plain"
    size="small"
    color="pink"
    density="comfortable"
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
    <div class="text-subtitle-1">Remover o vinculo do produto</div>

    <p class="text-caption text-grey-lighten-2">
      Não será possivel reverter esta ação, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
