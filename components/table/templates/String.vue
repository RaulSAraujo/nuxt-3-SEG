<script setup lang="ts">
defineProps<{ value: string; maxWidth: string | number | null }>();

const widthColumnText = (label: String) => {
  if (typeof label === "string" && label.length > 0) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // @ts-ignore
    context.font = "14px Poppins";

    return context?.measureText(label).actualBoundingBoxRight ?? 0;
  }
  return 0;
};
</script>

<template>
  <v-tooltip
    v-if="widthColumnText(value) > parseFloat(`${maxWidth || 0.0}`)"
    location="top"
    :text="value"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template v-slot:activator="{ props }">
      <div
        style="
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        "
      >
        <span v-bind="props">
          {{ value }}
        </span>
      </div>
    </template>
  </v-tooltip>

  <span v-else>{{ value }}</span>
</template>

<style>
/* .v-data-table__tr .v-data-table__td {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
} */
</style>
