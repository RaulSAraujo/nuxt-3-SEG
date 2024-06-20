<script setup lang="ts">
defineProps<{ value: string | number | Date | null }>();
</script>

<template>
  <span>
    {{ $dayjs(value).isValid() ? $dayjs(value).format("DD/MM/YYYY") : "" }}
  </span>
</template>
