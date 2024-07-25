<script setup lang="ts">
defineProps<{
  date: string | Date | null;
  formatFor?: string | null;
  formatFrom?: string | null;
}>();
</script>

<template>
  <span v-if="date">
    {{
      !$dayjs(date, formatFor ?? "DD/MM/YYYY").isValid()
        ? $dayjs(date, formatFrom ?? "YYYY-MM-DD").format(formatFor ?? "DD/MM/YYYY")
        : date
    }}
  </span>
</template>
