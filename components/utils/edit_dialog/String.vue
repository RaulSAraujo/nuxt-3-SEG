<script setup lang="ts">
import { mergeProps } from "vue";

const props = defineProps<{
  id: number;
  attr: string;
  text: string | null;
  vw: number;
}>();

const emit = defineEmits(["updateText"]);

const { url } = useTableStore();

const menu = ref<boolean>(false);

const widthColumnText = (label: string | null) => {
  if (typeof label === "string" && label.length > 0) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context!.font = "14px Poppins";

    return context?.measureText(label).actualBoundingBoxRight ?? 0;
  }
  return 0;
};

const convertVwToPx = (vw: number) => {
  const viewportWidth = window.innerWidth;
  return (vw / 100) * viewportWidth;
};

const comp = computed({
  get: () => props.text,
  set: async (value) => {
    if (typeof value != "string") return;

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
      <v-tooltip
        v-if="widthColumnText(text ?? '') > convertVwToPx(vw)"
        location="top"
        :text="text?.toUpperCase()"
        style="
          --v-theme-surface-variant: 25, 118, 210;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <div
            v-bind="mergeProps(menuProp, tooltip)"
            :style="` cursor: pointer;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              width: ${vw}vw;`"
          >
            <span>{{ text?.toUpperCase() }}</span>
          </div>
        </template>
      </v-tooltip>

      <div
        v-else-if="widthColumnText(text ?? '') < convertVwToPx(vw) && !text"
        v-bind="menuProp"
        :style="`cursor: pointer; width: ${vw}vw;margin: auto`"
      >
        <v-btn variant="plain" block />
      </div>

      <span v-else v-bind="menuProp" style="cursor: pointer">
        {{ text?.toUpperCase() }}
      </span>
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-text-field
              v-model="proxyModel.value"
              v-maska="'X'"
              density="compact"
              color="primary"
              :clearable="true"
              hide-details
              @click:clear="proxyModel.value = ''"
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
