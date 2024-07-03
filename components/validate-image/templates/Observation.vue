<script setup lang="ts">
import { mergeProps } from "vue";

const props = defineProps<{
  observation?: string | null;
}>();

const emit = defineEmits(["confirm"]);

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
}

const comp = computed({
  get: () => props.observation,
  set: (value) => {
    menu.value = false;
    emit("confirm", value);
  },
});

const menu = ref<boolean>(false);
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
        v-if="widthColumnText(observation ?? '') > convertVwToPx(5)"
        location="top"
        :text="observation?.toUpperCase()"
        style="
          --v-theme-surface-variant: 25, 118, 210;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <div
            v-bind="mergeProps(menuProp, tooltip)"
            style="
              cursor: pointer;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              width: 5vw;
            "
          >
            <span>{{ observation?.toUpperCase() }}</span>
          </div>
        </template>
      </v-tooltip>

      <div
        v-else-if="widthColumnText(observation ?? '') < 100 && !observation"
        v-bind="menuProp"
        style="cursor: pointer; width: 100%"
      >
        <v-label/>
      </div>

      <span v-else v-bind="menuProp" style="cursor: pointer">
        {{ observation?.toUpperCase() }}
      </span>
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-text-field
              v-model="proxyModel.value"
              density="compact"
              color="primary"
              :clearable="true"
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
