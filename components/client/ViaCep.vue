<script setup lang="ts">
const props = defineProps<{
  value?: string;
  alt?: string;
}>();

interface Success {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

interface Error {
  erro: string;
}

const emit = defineEmits(["update"]);

const loading = useLoadingIndicator();

const findAddress = async () => {
  loading.start();

  if (props.value!.length > 8) {
    try {
      const data = await useNuxtApp().$customFetch<Success | Error>(
        `client-addresses/viacep?cep=${props.value}`
      );

      if ("erro" in data) {
        loading.finish();

        return $toast().error("Cep não encontrado.");
      }

      emit("update", data);
    } catch (error) {
      if (error instanceof Error) {
        $toast().error(error.message);
      } else {
        $toast().error(`Erro desconhecido: ${error}`);
      }
    }
  } else {
    $toast().error("Informe um cep valido.");
  }

  loading.finish();
};
</script>

<template>
  <TextField
    v-maska="'#####-###'"
    label="Cep"
    :alt="alt"
    hide-details="auto"
    append-inner-icon="mdi-magnify"
    prepend-inner-icon="mdi-map-marker-outline"
    @click:append-inner="findAddress()"
    @keyup.enter="findAddress()"
  />
</template>
