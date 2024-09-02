<script setup lang="ts">
const props = defineProps<{
  id: string | number;
  attr: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;
  itemTitle: string;
  itemValue: string;
}>();

const emit = defineEmits(["save"]);

const menu = ref<boolean>(false);

const comp = computed({
  get: () => props.value,
  set: (value) => {
    menu.value = false;

    emit("save", value);
  },
});
</script>

<template>
  <v-menu
    v-model="menu"
    location="end"
    transition="slide-x-transition"
    offset="0 20"
    :close-on-content-click="false"
  >
    <template #activator="{ props: menuProp }">
      <slot v-bind="menuProp" style="cursor: pointer" />
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-select
              v-model="proxyModel.value"
              density="compact"
              color="primary"
              :clearable="true"
              :items="items"
              :item-title="itemTitle"
              :item-value="itemValue"
              hide-details
            />
          </template>

          <template #actions>
            <v-spacer />

            <component :is="actions" />
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-menu>
</template>
