<script setup lang="ts">
defineProps<{
  activateCreationButton: boolean;
  disabledMenu: boolean;
}>();

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

  <FilterButtons
    :activate-creation-button="activateCreationButton"
    :disabled-menu="disabledMenu"
    @create="$emit('create')"
  />
</template>
