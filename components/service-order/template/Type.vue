<script lang="ts" setup>
defineProps<{
  value: number;
}>();

const text = (value: number) => {
  if (value == 1) return "ORÇAMENTO";
  else if (value == 3) return "FORA DE GARANTIA";
  else if (value == 6) return "GARANTIA ESTENDIDA";
  else if (value == 11) return "GARANTIA FABRICANTE";
  else if (value == 12) return "REINGRESSO GAR. FAB.";
  else if (value == 13) return "REINGRESSO FOR. GAR.";
  else if (value == 14) return "REINGRESSO GAR. EST.";
  else if (value == 15) return "COMPROVANTE ANTIGO";
  else if (value == 16) return "COMPROVANTE ENTRADA";
  else if (value == 17) return "APARELHO DELTA";
  else return "";
};

const color = (value: number) => {
  if (value == 1) return "blue";
  else if (value == 3) return "green";
  else if (value == 6) return "pink";
  else if (value == 11) return "orange";
  else if (value == 12) return "grey";
  else if (value == 13) return "red";
  else if (value == 14) return "black";
  else if (value == 15) return "brown";
  else if (value == 16) return "purple";
  else if (value == 17) return "cyan";
  else return "deep-orange";
};
</script>

<template>
  <v-chip :text="text(value)" size="small" :color="color(value)" />
</template>
