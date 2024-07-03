<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { Filter } from "~/interfaces/Filter";

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
$api(`custom-filters-user?user_id=${user.id}&model=${model}`, {
  priority: "high",
  key: `filter-product${model}`,
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
</script>

<template>
  <FilterGroup />

  <FilterButtons />
</template>
