<script setup lang="ts">
const props = defineProps<{
  id: number;
  attr: string;
  value: string | null;
  exportSave?: boolean;
}>();

const emit = defineEmits(["updateText", "exportSave"]);

const { url } = useTableStore();

const menu = ref<boolean>(false);

const comp = computed({
  get: () => props.value,
  set: async (value) => {
    if (typeof value != "number") return;

    if (props.exportSave) {
      menu.value = false;

      return emit("exportSave", value);
    }

    const res = await update(value);
    if (!res.success) return $toast().error(res.message);

    menu.value = false;

    emit("updateText", value);
  },
});

const update = (value: number) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  return useNuxtApp().$customFetch<Response>(url, {
    method: "PUT",
    body: {
      id: props.id,
      [props.attr]: value,
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
      <ToLocaleString v-bind="menuProp" style="cursor: pointer" :value="value" />
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <CurrencyField v-model="proxyModel.value" />
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
