<script setup lang="ts">
onBeforeUnmount(() => {
  filterStore.clearValues();
});

const filterStore = useFilterStore();
const { availableFilter, changeValuesFilter } = storeToRefs(filterStore);

const { searchData } = useTableStore();

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

const dayjs = useDayjs();

const saveDate = (event: string, multiple: boolean | string) => {
  if (!multiple) return dayjs(event).format("DD/MM/YYYY");

  return `${dayjs(event[0]).format("DD/MM/YYYY")} - ${dayjs(
    event[event.length - 1]
  ).format("DD/MM/YYYY")}`;
};
</script>

<template>
  <ClientOnly>
    <v-row dense class="pa-5">
      <v-col
        v-for="(item, index) in availableFilter"
        :key="index"
        :cols="sizeCamp(item.layout_filters?.size)"
      >
        <TextField
          v-if="item.type == 'STRING' || item.type == 'FLOAT' || item.type == 'INTEGER'"
          v-model="item.value"
          :label="item.label"
          :clearable="item.layout_filters?.clearable"
          :placeholder="item.layout_filters?.approximate ? 'Digite o valor aproximado' : 'Digite o valor exato'"
          :hide-details="true"
          @update:model-value="changeValuesFilter = true"
          @enter="searchData"
        />

        <Select
          v-if="item.type == 'ARRAY' && !item.layout_filters?.comboBox"
          v-model="item.value"
          :value="typeof item.value == 'object' ? item.value ?? [] : []"
          :label="item.label"
          :items="item.association_data?.rows ?? []"
          :item-title="item.item_name ?? ''"
          :item-value="item.item_value ?? ''"
          :clearable="item.layout_filters?.clearable"
          :multiple="item.layout_filters?.multiple"
          @change="changeValuesFilter = true"
          @like="item.value = $event"
        />

        <Combobox
          v-if="item.type == 'ARRAY' && item.layout_filters?.comboBox"
          v-model="item.value"
          :value="typeof item.value == 'object' ? item.value ?? [] : []"
          :label="item.label"
          :items="item.association_data?.rows ?? []"
          :item-title="item.item_name ?? ''"
          :item-value="item.item_value ?? ''"
          :clearable="item.layout_filters?.clearable"
          :multiple="item.layout_filters?.multiple"
          @change="changeValuesFilter = true"
        />

        <DatePicker
          v-if="item.type == 'DATE'"
          v-model="item.value"
          :label="item.label"
          :multiple="item.layout_filters?.range ? 'range' : false"
          :clearable="item.layout_filters?.clearable"
          @save="
            item.value = saveDate($event, item.layout_filters?.range ? 'range' : false)
          "
          @change="changeValuesFilter = true"
        />

        <SwitchLock
          v-if="item.type == 'BOOLEAN'"
          v-model="item.value"
          :value="item.value == null ? null : !!item.value"
          :label="item.label"
          @switch="item.value = ''"
          @change="changeValuesFilter = true"
        />
      </v-col>
    </v-row>
  </ClientOnly>
</template>
