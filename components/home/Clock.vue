<script setup>
const now = useNow({ interval: 1000 });
const clock = computed(() => useDayjs(now.value).utc().local().format("HH:mm"));
</script>

<template>
  <ClientOnly>
    <p class="text-h1 text-center text-white">
      {{ clock }}
    </p>

    <p class="text-overline text-center text-white">
      {{ $dayjs().format("dddd Dº MMMM") }}
    </p>
  </ClientOnly>
</template>
