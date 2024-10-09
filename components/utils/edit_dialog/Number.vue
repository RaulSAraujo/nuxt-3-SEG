<script setup lang="ts">
const props = defineProps<{
  id: number;
  attr: string;
  value: number;
  disabled?: boolean;
}>();

const emit = defineEmits(["updateText", "enter", "response"]);

const { url } = useTableStore();

const menu = ref<boolean>(false);

const comp = computed({
  get: () => props.value,
  set: async (value) => {
    const res = await update(value);
    if (!res.success) return $toast().error(res.message);

    menu.value = false;

    emit("updateText", value);
    emit("response", res);
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
      <span
        v-bind="!disabled ? menuProp : ''"
        class="d-flex"
        :style="!disabled ? 'cursor: pointer' : ''"
      >
        {{ value }}
      </span>
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px" :disabled="disabled">
          <template #text>
            <NumberInput v-model="proxyModel.value" hide-details />
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
