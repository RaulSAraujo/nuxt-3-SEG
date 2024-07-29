<script setup lang="ts">
import type { Response } from "~/interfaces/Package.js";

interface Body {
  name: string;
  weight_cubic_kg: number;
  weight_per_cubic_kg: number;
  package_weight: number;
  width: number;
  height: number;
  length: number;
  custom: boolean;
}

const props = defineProps<{
  form: Body;
}>();

defineEmits(["close"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const update = async () => {
  const res = await useNuxtApp().$customFetch<Response>("package", {
    method: "POST",
    body: props.form,
  });

  if (!res.success) return $toast().error(res.message);

  $toast().success(res.message);

  items.value.splice(0, 0, res);
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="blue"
    @click="
      update();
      $emit('close');
    "
  />
</template>
