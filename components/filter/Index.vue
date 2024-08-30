<script setup lang="ts">
import type { Filter, User } from "~/interfaces/Filter";

defineProps<{
  disabledMenu: boolean;
}>();

// Resetar props
onBeforeRouteLeave((to, from, next) => {
  if (Object.keys(to.params).length > 0) {
    next();
  } else {
    filterStore.clearValues();

    filterStore.clearFilterProps();

    next();
  }
});

const filterStore = useFilterStore();

const { findModelName } = useModelStore();
const model = findModelName();

const { data: user } = useAuth();

const { data, status } = $api<Filter>(
  `custom-filters-user?user_id=${(user.value as User).id}&model=${model}`,
  {
    key: `filter-${model}`,
    lazy: true,
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <FilterGroup v-if="status == 'success'" :filters="data" />

  <FilterButtons :disabled-menu="disabledMenu">
    <template #menu>
      <slot name="menu" />
    </template>

    <template #button-create>
      <slot name="button-create" />
    </template>
  </FilterButtons>
</template>
