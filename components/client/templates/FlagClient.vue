<script setup lang="ts">
defineProps<{
  value: number;
}>();

const getFlags = (value: number) => {
  if (value === 0) return "blue";
  else if (value === 1) return "green";
  else if (value === 2) return "red";
  else return "";
};
</script>

<template>
  <v-icon icon="mdi-flag" :color="getFlags(value)" size="25" />
</template>
