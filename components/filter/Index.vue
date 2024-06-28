<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { FilterData } from "~/interfaces/Filter";

const props = defineProps<{
  model: string;
  modeCreate: boolean;
}>();

const { data } = useAuth();
const user = data.value as User;

const store = useFilterStore();
const { availableFilter } = storeToRefs(store);

/**
 * Request para obter a grid do usuario de acordo com a pagina
 * @param user.id Identificador do usuario
 * @param props.model Nome da model back-end
 * @constant filter Payload formatado
 * @constant headers Novo array colocando em sequencia
 */
let filter: FilterData;
$api(`custom-filters-user?user_id=${user.id}&model=${props.model}`, {
  priority: "high",
  key: "filter-product",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
})
  .then((res) => {
    if (res.error.value) throw res;

    filter = res.data.value as FilterData;

    store.setData(filter);
  })
  .catch((err) => {
    $toast().error(err.error.value.cause ?? err.error.value.message);
  });

const sizeCamp = (layoutSize: number | undefined) => {
  let size = layoutSize !== undefined ? layoutSize : 2;

  const app = useNuxtApp();

  if (app.$vuetify.display.smAndDown.value) {
    size = 12;
  }

  if (app.$vuetify.display.md.value) {
    size = size + 4;
  }

  if (app.$vuetify.display.lg.value) {
    size = size + 1;
  }

  return size;
};
</script>

<template>
  <ClientOnly fallback-tag="div">
    <v-row dense class="pa-5">
      <v-col
        v-for="(item, index) in availableFilter"
        :key="index"
        :sm="sizeCamp(item.layout_filters.size)"
      >
        <FilterInputTextField
          v-if="
            item.type == 'TEXT' ||
            item.type == 'STRING' ||
            item.type == 'FLOAT' ||
            item.type == 'INTEGER'
          "
          v-model="item.value"
          :label="item.label"
          :clearable="item.layout_filters.clearable"
          :approximate="item.layout_filters.approximate"
        />

        <FilterInputSelect
          v-if="item.type == 'ARRAY' && !item.layout_filters.comboBox"
          v-model="item.value"
          :value="item.value?.toString()"
          :label="item.label"
          :items="item.association_data.rows"
          :item-title="item.item_name"
          :item-value="item.item_value"
          :clearable="item.layout_filters.clearable"
          :multiple="item.layout_filters.multiple"
          @change="item.value = $event"
        />

        <FilterInputCombobox
          v-if="item.type == 'ARRAY' && item.layout_filters.comboBox"
          v-model="item.value"
          :value="item.value?.toString()"
          :label="item.label"
          :items="item.association_data.rows"
          :item-title="item.item_name"
          :item-value="item.item_value"
          :clearable="item.layout_filters.clearable"
          :multiple="item.layout_filters.multiple"
        />

        <FilterInputDatePicker
          v-if="item.type == 'DATE' && !item.layout_filters.range"
          v-model="item.value"
          :label="item.label"
          :clearable="item.layout_filters.clearable"
          :disabled="false"
          @save="item.value = $dayjs($event).format('DD/MM/YYYY')"
        />

        <FilterInputSwitch
          v-if="item.type == 'BOOLEAN'"
          v-model="item.value"
          :value="!!item.value"
          :label="item.label"
          @switch="item.value = ''"
          @update:model-value="console.log(item.value)"
        />
      </v-col>
    </v-row>

    <template #fallback>
      <!-- this will be rendered on server side -->
      <v-skeleton-loader class="pa-5" type="image" />
    </template>
  </ClientOnly>

  <div class="d-flex justify-end mr-5 mb-3">
    <v-btn-toggle v-if="modeCreate" variant="outlined" density="comfortable" divided>
      <v-btn> CRIAR </v-btn>
      <v-btn> BUSCAR </v-btn>
      <v-btn>Limpar Filtros</v-btn>
    </v-btn-toggle>

    <v-btn-toggle v-else variant="outlined" density="comfortable" divided>
      <v-btn> BUSCAR </v-btn>

      <v-btn>Limpar Filtros</v-btn>
    </v-btn-toggle>
  </div>
</template>
