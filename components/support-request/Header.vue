<script setup lang="ts">
const props = defineProps<{
  id: number;
  classification: string;
  priority: number;
  title: string;
  status: string;
}>();

const statusRequest = ref([
  "EM ABERTO",
  "EM ANÁLISE",
  "NA FILA",
  "REPROVADO",
  "EM ANDAMENTO",
  "CONCLUIDO",
]);

const newStatus = computed(() => props.status);
</script>

<template>
  <v-toolbar rounded="t-xl">
    <template #title>
      <span>#{{ id }}</span>
      <span> - </span>
      <span>{{ classification }}</span>
      <span> - </span>
      <SupportRequestTemplatePriority :priority="priority" />
      <span> - </span>
      <span>{{ title }}</span>
    </template>

    <template #append>
      <span class="text-h5">STATUS: </span>

      <Select
        v-model="newStatus"
        :items="statusRequest"
        item-title=""
        item-value=""
        :clearable="false"
        :multiple="false"
        class="mx-3"
        width="200px"
      />
    </template>
  </v-toolbar>
</template>
