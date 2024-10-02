<script lang="ts" setup>
    defineProps<{
        date: string
    }>()

    const now = useNow({ interval: 1000 });
</script>

<template>
  <span class="text-grey text-caption font-italic">
    {{ $dayjs(now).diff(date, "minutes") }} Min
  </span>
</template>
