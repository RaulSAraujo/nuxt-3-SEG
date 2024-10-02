<script setup lang="ts">
defineProps<{
  priority: number;
  iconOrText?: "text" | "icon";
  activeColor?: boolean;
}>();

const text = (value: number) => {
  if (value == 0) return "BAIXA";
  if (value == 1) return "MÉDIA";
  if (value == 2) return "ALTA";

  return "NÃO DEFINIDO";
};

const icon = (value: number) => {
  if (value == 0) return "mdi-chevron-triple-down";
  if (value == 1) return "mdi-equal";
  if (value == 2) return "mdi-chevron-triple-up";
};

const color = (value: number) => {
  if (value == 0) return "blue";
  if (value == 1) return "yellow";
  if (value == 2) return "red";

  return "black";
};
</script>

<template>
  <div v-if="iconOrText === 'icon'">
    <v-icon :icon="icon(priority)" :color="color(priority)" size="25px" />
  </div>

  <span v-else :class="activeColor ? `text-${color(priority)}` : ''">
    {{ text(priority) }}
  </span>
</template>
