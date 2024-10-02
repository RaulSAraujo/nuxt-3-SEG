<script lang="ts" setup>
defineProps<{
  message: string;
}>();

const widthColumnText = (label: string | null) => {
  if (typeof label === "string" && label.length > 0) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context!.font = "15px Poppins";

    return context?.measureText(label).actualBoundingBoxRight ?? 0;
  }
  return 0;
};
</script>

<template>
  <v-tooltip
    v-if="widthColumnText(message ?? '') > 255"
    location="bottom"
    :text="message"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <div
        class="mr-2"
        :style="`white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important`"
      >
        <span v-bind="props" class="text-caption"> {{ message }} </span>
      </div>
    </template>
  </v-tooltip>

  <span v-else class="text-caption"> {{ message }} </span>
</template>
