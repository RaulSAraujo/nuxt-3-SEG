<script setup lang="ts">
import type { Page } from "~/interfaces/Page";

const { data: pages } = await useAsyncData("pages", async () => {
  const res = (await $fetch("/api/pages")) as Page[];
  return res;
},{
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key]
  },
});
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
    <template v-slot:activator="{ props }">
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
        <template v-slot:prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title v-text="item.title" class="text-uppercase" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
