<script lang="ts" setup>
defineProps<{
  status: string | null;
}>();

const color = (status: string) => {
  if (status == "BAIXO") return "text-red";
  if (status == "NO LIMITE") return "text-primary";
  if (status == "NORMAL") return "text-green";
};
</script>

<template>
  <span v-if="status" :class="color(status)">{{ status }}</span>
</template>
