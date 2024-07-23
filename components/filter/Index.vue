<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { Filter } from "~/interfaces/Filter";

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

const { data } = useAuth();
const user = data.value as User;

const { model } = useModelStore();

const filterStore = useFilterStore();

/**
 * Request para obter a grid do usuario de acordo com a pagina
 * @param user.id Identificador do usuario
 * @param props.model Nome da model back-end
 * @constant filter Payload formatado
 * @constant headers Novo array colocando em sequencia
 */
let filter: Filter;
if (filterStore.availableFilter.length == 0) {
  $api(`custom-filters-user?user_id=${user.id}&model=${model}`, {
    priority: "high",
    key: `filter-${model}`,
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  })
    .then((res) => {
      if (res.error.value) throw res;

      filter = res.data.value as Filter;

      if (filter.resultCount > 0) {
        filterStore.set(filter);
      } else {
        filterStore.create();
      }
    })
    .catch((err) => {
      $toast().error(err.error.value.cause ?? err.error.value.message);
    });
}
</script>

<template>
  <FilterGroup />

  <FilterButtons @create="$emit('create')" />
</template>
