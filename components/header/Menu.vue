<script setup lang="ts">
import type { Page } from "~/interfaces/Page";

defineProps<{
  pages: Page[];
}>();
</script>

<template>
  <v-menu
    v-for="(page, i) in pages"
    :key="i"
    location="bottom"
    transition="slide-y-transition"
    offset="5 50"
    width="250px"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="plain"
        :text="page.title"
        density="default"
        height="60px"
        class="text-uppercase"
      />
    </template>

    <v-list :lines="false" density="default" variant="plain" nav class="rounded-xl">
      <v-list-item
        v-for="(item, a) in page.items"
        :key="a"
        :value="item"
        color="primary"
        :to="{ name: item.name }"
      >
        <template #prepend>
          <v-icon :icon="`${item.icon}`" />
        </template>

        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style>
.v-theme--light .v-list-item--variant-plain {
  opacity: 0.75;
  color: black;
}

.v-theme--light .v-list-item--variant-plain:hover {
  opacity: 1;
  color: black;
}
</style>
