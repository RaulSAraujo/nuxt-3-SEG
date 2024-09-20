<script setup lang="ts">
const props = defineProps<{
  pstatuses: {
    name: string;
  }[];
}>();

const status = computed(() => props.pstatuses.map((e) => e.name).join(", "));
</script>

<template>
  <Tooltip :text="status" :vw="4" />
</template>
