<script setup lang="ts">
const props = defineProps<{
  id: number;
  attr: string;
  date: string;
  clearable: boolean | undefined;
}>();

const emit = defineEmits(["updateText"]);

const { url } = useTableStore();

const { brDate, databaseDate } = useDateConversion();

const menu = ref<boolean>(false);

const comp = computed({
  get: () => brDate(props.date),
  set: async (value) => {
    const res = await update(value);
    if (!res.success) return $toast().error(res.message);

    menu.value = false;

    emit("updateText", value);
  },
});

const update = (value: string) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  return useNuxtApp().$customFetch<Response>(url, {
    method: "PUT",
    body: {
      id: props.id,
      [props.attr]: value ? databaseDate(value) : null,
    },
  });
};
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
      <div v-if="!date" v-bind="menuProp" :style="`cursor: pointer`">
        <v-label />
      </div>

      <span v-bind="menuProp" style="cursor: pointer">
        <DateString :date="date" />
      </span>
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-text-field
              v-model="proxyModel.value"
              v-maska="'##/##/####'"
              density="compact"
              color="primary"
              :clearable="clearable"
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
