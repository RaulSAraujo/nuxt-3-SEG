<script setup lang="ts">
defineProps<{
  costStatus: string;
}>();

const color = (value: string) => {
  if (value == "REDUZIU") return "green";
  if (value == "MANTEVE") return "blue";
  if (value == "AUMENTOU") return "red";
};
</script>

<template>
  <v-icon icon="mdi-circle" :color="color(costStatus)" />
</template>
