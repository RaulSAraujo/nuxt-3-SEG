<script setup lang="ts">
import type { Row, Response } from "~/interfaces/Package.js";

const props = defineProps<{
  form: Row;
}>();

defineEmits(["close"]);

const update = async () => {
  const res = await useNuxtApp().$customFetch<Response>("package", {
    method: "PUT",
    body: props.form,
  });

  if (!res.success) return $toast().error(res.message);

  $toast().success(res.message);
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="primary"
    variant="flat"
    width="8vw"
    @click="
      update();
      $emit('close');
    "
  />
</template>
