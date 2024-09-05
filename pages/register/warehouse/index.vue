<script setup lang="ts">
useHead({
  titleTemplate: `Almoxarifados - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">ALMOXARIFADOS</span>

    <Filter />

    <Table show-select multi-sort />
  </div>
</template>
