<script lang="ts" setup>
defineProps<{
  text: string;
}>();

const color = (text: string) => {
  if (text == "BALCAO") return "blue";
  else if (text == "IN HOME") return "purple";
  else if (text == "VENDER") return "brown";
  else if (text == "DESMONTAR") return "orange";
  else return "deep-orange";
};
</script>

<template>
  <v-chip :text="text" size="small" :color="color(text)" />
</template>
