<script setup lang="ts">
defineProps<{
  disabledMenu: boolean;
}>();

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

  <FilterButtons :disabled-menu="disabledMenu">
    <template #menu>
      <slot name="menu" />
    </template>

    <template #button-create>
      <slot name="button-create" />
    </template>
  </FilterButtons>
</template>
