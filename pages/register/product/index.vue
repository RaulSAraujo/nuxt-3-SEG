<script setup lang="ts">
import { isClient } from "@vueuse/core";

// import type { User } from "~/interfaces/User";

// interface FilterData {
//   resultCount: number;
//   rows: {
//     available_filters: {}[];
//     hidden_filters: {}[];
//   }[];
//   totalRecords: number;
// }

// const { data } = useAuth();
// const user = data.value as User;

const { findModelName } = useModelStore();
const { name }: any = useRoute();
const modelName = findModelName(name);

// const resFilter = await $api(`custom-filters-user?user_id=${user.id}&model=${modelName}`);

// if (resFilter.error.value) {
//   console.error(resFilter.error.value);
// }

// const filter = resFilter.data.value as FilterData;

const widthColumnText = (label: string) => {
  if (isClient) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    return context?.measureText(label).width;
  }
  return false;
};
</script>

<template>
  <Table
    title="PRODUTO COMPRA"
    url="product"
    show-select
    multi-sort
    :model="modelName"
    :disabled-menu="true"
  >
    <template #item.action>
      <v-btn icon="mdi-pencil" variant="plain" size="small" />
    </template>

    <template #item.pref="{ item }: Record<string, any>">
      <div class="d-flex flex-row justify-center align-center">
        <div v-if="item.Family.product_id == item.id">
          <v-tooltip location="bottom" text="Pref.Venda">
            <template #activator="{ props }">
              <v-img v-bind="props" width="15px" src="/icons/disp1.gif" />
            </template>
          </v-tooltip>
        </div>
        <div v-if="item.Family.buy_preference_id == item.id">
          <v-tooltip location="bottom" text="Pref.Compra">
            <template #activator="{ props }">
              <v-img
                v-bind="props"
                class="mt-n4"
                width="15px"
                src="/icons/pref-compra.gif"
              />
            </template>
          </v-tooltip>
        </div>
      </div>
    </template>

    <template #item.name="{ item }: Record<string, any>">
      <span v-if="!item.observation_cod_fab && item.name">
        {{ item.name?.toUpperCase() }}
      </span>

      <v-tooltip v-else location="top" :text="item.observation_cod_fab?.toUpperCase()">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="text-red"> {{ item.name?.toUpperCase() }} </span>
        </template>
      </v-tooltip>
    </template>

    <template #item.description="{ item }: Record<string, any>">
      <!-- {{ console.log(widthColumnText(item.description)) }} -->


      <v-tooltip location="top" :text="item.description?.toUpperCase()">
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            {{ item.description?.toUpperCase() }}
          </span>
        </template>
      </v-tooltip>
    </template>

    <template #item.observation="{ item }: Record<string, any>">
      <v-tooltip location="top" :text="item.observation?.toUpperCase()">
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            {{ item.observation?.toUpperCase() }}
          </span>
        </template>
      </v-tooltip>
    </template>

    <template #item.pstatuses="{ item }: Record<string, any>">
      <v-tooltip v-if="item.Pstatuses" location="top">
        <template #activator="{ props }">
          <span v-if="item.Pstatuses[0]" v-bind="props">
            {{ item.Pstatuses[0].name }}
          </span>
        </template>
        <span v-for="(status, index) in item.Pstatuses" :key="index">
          <span>
            {{ status.name }}
            <br />
          </span>
        </span>
      </v-tooltip>
    </template>
  </Table>
</template>
