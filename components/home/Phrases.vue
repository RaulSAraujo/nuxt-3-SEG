<script setup lang="ts">
import type { Phrase } from "~/interfaces/Phrase";

const { data, status } = useLazyFetch(
  "https://pensador-api.vercel.app/?term=Elon Musk&max=1",
  {
    key: "Phrases",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    transform: (fetchData: Phrase) => ({
      text: fetchData.frases[0].texto,
    }),
  }
);
</script>

<template>
  <v-skeleton-loader
    :loading="status === 'pending'"
    type="paragraph"
    color="transparent"
    theme="light"
  >
    <div
      style="
        width: 30vw;
        height: 100px;
        background-color: rgba(0, 0, 0, 0);
        overflow: auto;
        --width-scrollbar: 5px;
        --track-color: rgba(0, 0, 0, 0);
        --thumb-color: #8080804d;
        --border-color: rgba(0, 0, 0, 0);
        --track-color-hover: #808080a3;
      "
      class="px-2 rounded-lg text-center"
    >
      <span class="text-caption text-white">{{ data?.text }}</span>
    </div>
  </v-skeleton-loader>
</template>
