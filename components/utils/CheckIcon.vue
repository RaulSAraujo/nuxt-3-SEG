<script setup lang="ts">
const props = defineProps<{
  value: boolean;
  readonly?: boolean;
  enableAlert?: boolean;
  id?: number;
  attr?: string;
}>();

const emit = defineEmits(["updateValue"]);

const { url } = useTableStore();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const loading = useLoadingIndicator();

const comp = computed({
  get: () => props.value,
  set: async (value) => {
    loading.start();

    const res = await update(value);

    if (!res.success) return $toast().error(res.message);

    loading.finish();

    emit("updateValue", value);
  },
});

const update = (value: boolean) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  return useNuxtApp().$customFetch<Response>(url, {
    method: "PUT",
    body: {
      id: props.id,
      [props.attr!]: value,
    },
  });
};
</script>

<template>
  <v-btn
    :icon="value ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="value ? 'green' : 'red'"
    size="30"
    variant="text"
    :readonly="readonly"
    @click="enableAlert ? (snackbar = true) : (comp = !comp)"
  />

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
    <div class="text-subtitle-1">Deseja atualizar ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn
        color="white"
        variant="plain"
        @click="
          comp = !comp;
          snackbar = false;
        "
      >
        Sim
      </v-btn>
    </template>
  </v-snackbar>
</template>
