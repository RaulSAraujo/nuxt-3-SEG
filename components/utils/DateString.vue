<script setup lang="ts">
defineProps<{
  date: string | Date | null;
}>();
</script>

<template>
  <span v-if="date">
    {{
      !$dayjs(date, "DD/MM/YYYY").isValid()
        ? $dayjs(date, "YYYY-MM-DD").format("DD/MM/YYYY")
        : date
    }}
  </span>
</template>
