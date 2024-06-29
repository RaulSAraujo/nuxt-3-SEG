<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string | [] | null | undefined;
  clearable: boolean | undefined;
  items: [];
  itemTitle: string;
  itemValue: string;
  multiple: boolean | undefined;
}>();

const likesAll = computed(() => (props.value?.length ?? 0) === props.items.length);
const likesSome = computed(() => (props.value?.length ?? 0) > 0);

const emit = defineEmits(["change"]);

const toggle = () => {
  if (likesAll.value) {
    emit("change", []);
  } else {
    emit("change", props.items.slice());
  }
};
</script>

<template>
  <v-select
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :multiple="multiple"
    :clearable="clearable"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    hide-details="auto"
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
