<script setup lang="ts">
import { mergeProps } from "vue";

const props = defineProps<{
  id: number;
  status: string;
}>();

const emit = defineEmits(["save"]);

const menu = ref<boolean>(false);

const comp = computed({
  get: () => props.status,
  set: async (value) => {
    const res = await update(value);
    if (!res.success) return $toast().error(res.message);

    menu.value = false;

    emit("save", value);
  },
});

const update = (value: string) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  return useNuxtApp().$customFetch<Response>("validate-products-image", {
    method: "PUT",
    body: {
      id: props.id,
      status: value,
    },
  });
};

const radioList = ref<{ color: string; value: string }[]>([
  {
    color: "blue",
    value: "NÃO PRIORITARIO",
  },
  {
    color: "yellow",
    value: "PRIORITARIO",
  },
  {
    color: "green",
    value: "FINALIZADO",
  },
  {
    color: "red",
    value: "PEÇA SEM ESTOQUE",
  },
]);

const icon = (status: string) => {
  if (status === "NÃO PRIORITARIO") return "mdi-alpha-n-circle";
  if (status === "PRIORITARIO") return "mdi-alpha-p-circle";
  if (status === "FINALIZADO") return "mdi-alpha-f-circle";
  if (status === "PEÇA SEM ESTOQUE") return "mdi-alpha-s-circle";
  else return "mdi-circle";
};

const color = (status: string) => {
  if (status === "NÃO PRIORITARIO") return "blue";
  if (status === "PRIORITARIO") return "yellow";
  if (status === "FINALIZADO") return "green";
  if (status === "PEÇA SEM ESTOQUE") return "red";
  else return "transparent";
};

const colorTooltip = (status: string) => {
  if (status === "NÃO PRIORITARIO") return "33, 150, 243";
  if (status === "PRIORITARIO") return "255, 235, 59";
  if (status === "FINALIZADO") return "76, 175, 80";
  if (status === "PEÇA SEM ESTOQUE") return "244, 67, 54";
  else return "transparent";
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
      <v-tooltip
        location="top"
        :text="status?.toUpperCase()"
        :style="`--v-theme-surface-variant: ${colorTooltip(status ?? '')};
      --v-theme-on-surface-variant: 255, 255, 255;`"
      >
        <template #activator="{ props: tooltip }">
          <v-icon
            v-bind="mergeProps(menuProp, tooltip)"
            :color="color(status ?? '')"
            :icon="icon(status ?? '')"
          />
        </template>
      </v-tooltip>
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
              :items="radioList"
              item-title="value"
              item-value="value"
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
