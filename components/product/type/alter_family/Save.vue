<script setup lang="ts">
import type { Product } from "~/interfaces/Family.js";

const props = defineProps<{
  id?: number | undefined;
  disabled: boolean;
}>();

const emit = defineEmits(["close"]);

const family = useNuxtApp().payload.data["FamilyProduct"] as Partial<Product>[];

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const route = useRoute();

const loading = ref<boolean>(false);

const save = async () => {
  loading.value = true;

  try {
    await useNuxtApp().$customFetch(`product`, {
      method: "PUT",
      body: {
        id: route.params.id,
        produto_chave: props.id,
      },
    });

    $toast().success("Sucesso em atualizar a familia.");

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.value = false;
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="blue"
    :disabled="disabled"
    :loading="loading"
    @click="family!.length == 1 ? (snackbar = true) : save()"
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
    <div class="text-subtitle-1">
      A familia atual {{ $route.params.type_id }} ficará sem produtos, deseja continuar ?
    </div>

    <p class="text-caption text-grey-lighten-2">
      Esta família será deletada e essa ação não poderá ser revertida.
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="save()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
