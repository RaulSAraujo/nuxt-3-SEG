<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { FilterData } from "~/interfaces/Filter";

const props = defineProps<{
  model: string;
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

  if (app.$vuetify.display.mobile.value) {
    size = 12;
  }

  if (app.$vuetify.display.sm.value) {
    size = size + 4;
  }

  if (app.$vuetify.display.md.value) {
    size = size + 2;
  }

  // if (app.$vuetify.display.lgAndUp.value) {
  //   size = size + 1;
  // }

  return size;
};
</script>

<template>
  <v-row dense class="ma-3">
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
        :value="item.value"
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
        :value="item.value"
        :label="item.label"
        :items="item.association_data.rows"
        :item-title="item.item_name"
        :item-value="item.item_value"
        :clearable="item.layout_filters.clearable"
        :multiple="item.layout_filters.multiple"
      />
    </v-col>
  </v-row>

  <!-- <v-row class="mt-n1 mb-1" justify="end">
    <v-col
      v-if="created"
      align-self="center"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
      class="d-flex flex-row justify-center"
    >
      <v-btn-toggle dense>
        <v-btn outlined color="green" @click="eventCreatedFunction()"> CRIAR </v-btn>

        <v-btn outlined color="primary" @click="!disabled ? eventCallApi() : null">
          BUSCAR
        </v-btn>

        <v-btn outlined color="pink" @click="!disabled ? clear() : null"
          >Limpar Filtros</v-btn
        >
      </v-btn-toggle>
    </v-col>

    <v-col v-else align-self="center" cols="12" sm="6" md="3" lg="3" xl="2">
      <v-btn-toggle dense>
        <v-btn outlined color="primary" @click="!disabled ? eventCallApi() : null">
          BUSCAR
        </v-btn>

        <v-btn outlined color="pink" @click="!disabled ? clear() : null"
          >Limpar Filtros</v-btn
        >
      </v-btn-toggle>
    </v-col>
  </v-row> -->
</template>
