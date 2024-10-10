<script lang="ts" setup>
defineProps<{
  text: string | null;
}>();

const color = (text: string) => {
  if (text == "OUTRAS") return "red";
  else if (text == "JABOTICABAL") return "orange";
  else if (text == "ITUVERAVA") return "green";
  else if (text == "BARRETOS") return "purple";
  else if (text == "RIBEIRAO PRETO") return "grey";
  else if (text == "FRANCA") return "blue";
  else if (text == "SÃO JOAQUIM DA BARRA") return "brown";
  else if (text == "PASSOS") return "pink";
  else return "deep-orange";
};
</script>

<template>
  <v-chip v-if="text" :text="text" size="small" :color="color(text)" />
</template>
