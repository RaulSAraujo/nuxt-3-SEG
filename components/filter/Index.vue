<script setup lang="ts">
defineEmits(["create"]);

// Resetar props
onBeforeRouteLeave((to, from, next) => {
  if (Object.keys(to.params).length > 0) {
    next();
  } else {
    filterStore.clearFilterProps();

    next();
  }
});

const filterStore = useFilterStore();

filterStore.get();
</script>

<template>
  <FilterGroup />

  <FilterButtons @create="$emit('create')" />
</template>
