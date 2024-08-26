<script setup lang="ts">
const list = ref([
  {
    color: "blue",
    value: "NÃO PRIORITARIO",
  },
  {
    color: "yellow",
    value: "PRIORITARIO",
  },
  {
    color: "green",
    value: "FINALIZADO",
  },
  {
    color: "red",
    value: "PEÇA SEM ESTOQUE",
  },
]);

const activeIcon = (status: string) => {
  if (status === "NÃO PRIORITARIO") return "mdi-alpha-n-circle";
  if (status === "PRIORITARIO") return "mdi-alpha-p-circle";
  if (status === "FINALIZADO") return "mdi-alpha-f-circle";
  if (status === "PEÇA SEM ESTOQUE") return "mdi-alpha-s-circle";
  else return "mdi-circle";
};

const colorTooltip = (status: string) => {
  if (status === "NÃO PRIORITARIO") return "33, 150, 243";
  if (status === "PRIORITARIO") return "255, 235, 59";
  if (status === "FINALIZADO") return "76, 175, 80";
  if (status === "PEÇA SEM ESTOQUE") return "244, 67, 54";
  else return "transparent";
};
</script>

<template>
  <v-radio-group
    inline
    hide-details
    density="comfortable"
    defaults-target="NÃO PRIORITARIO"
  >
    <v-tooltip
      v-for="(radio, index) in list"
      :key="index"
      location="top"
      :style="`--v-theme-surface-variant: ${colorTooltip(radio.value ?? '')};
        --v-theme-on-surface-variant: 255, 255, 255;`"
    >
      <template #activator="{ props }">
        <v-radio
          v-bind="props"
          :value="radio.value"
          :color="radio.color"
          :true-icon="activeIcon(radio.value)"
          :false-icon="activeIcon(radio.value)"
        />
      </template>

      <span>
        {{ radio.value }}
      </span>
    </v-tooltip>
  </v-radio-group>
</template>
