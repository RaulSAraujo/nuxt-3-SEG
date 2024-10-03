<script setup lang="ts">
const props = defineProps<{
  id: number;
  classification: string;
  priority: number;
  title: string;
  status: string;
}>();

const emit = defineEmits(["updateStatus"]);

const statusRequest = ref([
  "EM ABERTO",
  "EM ANÁLISE",
  "REPROVADO",
  "EM ANDAMENTO",
  "CONCLUIDO",
]);

const newStatus = ref(props.status);

const { $customFetch } = useNuxtApp();

watch(
  () => newStatus.value,
  async () => {
    try {
      const res = await $customFetch<{ message: string }>(`support-request`, {
        method: "PUT",
        body: {
          id: props.id,
          status: newStatus.value,
        },
      });

      emit("updateStatus", newStatus.value);

      $toast().success(res.message);
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(`${err.data.error ?? err.statusText}`);
    }
  }
);
</script>

<template>
  <v-toolbar color="primary" rounded="t-xl">
    <template #title>
      <span>#{{ id }}</span>
      <span> - </span>
      <span>{{ classification }}</span>
      <span> - </span>
      <SupportRequestTemplatePriority :priority="priority" />
      <span> - </span>
      <span>{{ title.toUpperCase() }}</span>
    </template>

    <template #append>
      <span class="text-h5">STATUS: </span>

      <Select
        v-model="newStatus"
        :items="statusRequest"
        :clearable="false"
        :multiple="false"
        class="mx-3"
        width="200px"
        max-height-menu="350"
      />
    </template>
  </v-toolbar>
</template>
