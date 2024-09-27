<script setup lang="ts">
defineProps<{
  cutTimes: [];
}>();

const company = ref();

const companys = ref(["COMCLICK", "LOJADOTECNICO", "ORIGIPARTS", "VIZIOTECH"]);

const select = ref([]);

const headers = ref([
  { title: "DIAS", key: "days" },
  {
    title: "HORÁRIO DE COLETA INICIAL",
    key: "collection_time_to",
  },
  {
    title: "HORÁRIO DE COLETA FINAL",
    key: "collection_time_from",
  },
  { title: "HORÁRIO DE CORTE", key: "cutoff_time" },
]);

// const stringDay = (item, index: number) => {
//   if (index === 0) return "SEGUNDA";
//   if (index === 1) return "TERÇA";
//   if (index === 2) return "QUARTA";
//   if (index === 3) return "QUINTA";
//   if (index === 4) return "SEXTA";
//   if (index === 5) return "SABADO";
//   else return "";
// };
</script>

<template>
  <v-dialog>
    <v-sheet>
      <v-toolbar title="IMPORTAÇÃO DE HORÁRIOS DE CORTE" />

      <Select v-model="company" label="EMPRESA" :items="companys" />
    </v-sheet>

    <v-sheet v-for="(cutTime, index) in cutTimes" :key="index">
      <!-- <v-toolbar :title="cutTime.Collect" />
      <v-data-table
        v-model="select"
        show-select
        :headers="headers"
        :items="cutTime.schedules"
        disable-sort
        disable-pagination
        hide-default-footer
      >
        <template #item.days="{ item, index }">
          {{ stringDay(item, index) }}
        </template>
      </v-data-table> -->
    </v-sheet>
  </v-dialog>
</template>
