<script setup lang="ts">
import type { Pstatus, Row } from "~/interfaces/Pstatus.js";

const emit = defineEmits(["update"]);

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const { data, status } = $api<Row[]>("pstatus", {
  key: "PstatusList",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    let rows = ((fetchData as unknown) as Pstatus).rows;

    rows = useSorted(rows, (a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;

      return 0;
    }).value;

    rows.forEach((element) => {
      const find = product.value?.Pstatuses!.find((item) => {
        return element.id === item.id;
      });

      element.active = !!find;
    });

    return rows;
  },
});

emit("update", data);
</script>

<template>
  <v-virtual-scroll
    v-if="status === 'success'"
    :items="data || []"
    height="50vh"
    item-height="60"
    style="
      overflow: auto;
      --width-scrollbar: 5px;
      --track-color: rgba(0, 0, 0, 0);
      --thumb-color: #8080804d;
      --border-color: rgba(0, 0, 0, 0);
      --track-color-hover: #808080a3;
    "
    class="px-1"
  >
    <template #default="{ item, index }">
      <v-list-item :title="`${item.id}.${item.name}`">
        <template #append>
          <v-btn
            :text="item.active ? 'Remover' : 'Adicionar'"
            :color="item.active ? 'red' : 'blue'"
            variant="plain"
            size="small"
            @click="item.active = !item.active"
          />
        </template>
      </v-list-item>

      <v-divider v-if="(index + 1) != data!.length" />
    </template>
  </v-virtual-scroll>
</template>
