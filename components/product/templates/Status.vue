<script setup>
defineProps({
  item: { type: Object, default: {} },
});
</script>

<template>
  <v-tooltip
    v-if="item.Pstatuses"
    location="top"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <span v-if="item.Pstatuses[0]" v-bind="props">
        {{ item.Pstatuses[0].name }}
      </span>
    </template>
    <span v-for="(status, index) in item.Pstatuses" :key="index">
      <span>
        {{ status.name }}
        <br />
      </span>
    </span>
  </v-tooltip>
</template>
