<script setup lang="ts">
const props = defineProps<{
  label: string;
  value?: [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;
  itemTitle: string;
  itemValue: string;
  clearable?: boolean | undefined;
  multiple: boolean | undefined;
  returnObject?: boolean | undefined;
}>();

const likesAll = computed(() => props.value!.length === props.items.length);
const likesSome = computed(() => props.value!.length > 0);

const emit = defineEmits(["like"]);

const toggle = () => {
  if (likesAll.value) {
    emit("like", []);
  } else {
    const map = useArrayMap(props.items, (item) => item[props.itemValue]);
    emit("like", map.value);
  }
};
</script>

<template>
  <v-select
    :id="label"
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :multiple="multiple"
    :clearable="clearable"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :return-object="returnObject"
    :menu-props="{
      // @ts-ignore
      'max-height': '200',
    }"
    hide-details
  >
    <template v-if="multiple" #prepend-item>
      <v-list-item title="Select All" @click="toggle">
        <template #prepend>
          <v-checkbox-btn
            :color="likesSome ? 'indigo-darken-4' : undefined"
            :indeterminate="likesSome && !likesAll"
            :model-value="likesAll"
          />
        </template>
      </v-list-item>

      <v-divider />
    </template>

    <template v-if="multiple" #selection="{ item, index }">
      <span
        v-if="index < 1"
        style="
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        "
      >
        {{ item.title }}
      </span>

      <span v-if="index === 1" class="text-grey text-caption align-self-center">
        (+{{ (value?.length ?? 1) - 1 }})
      </span>
    </template>
  </v-select>
</template>

<style>
.v-select__selection {
  max-width: 70%;
}
</style>
