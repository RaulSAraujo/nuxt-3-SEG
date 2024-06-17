<script setup lang="ts">
import type { Phrase } from "~/interfaces/Phrase";

const loading = ref({ type: Boolean, default: true });

const { data: phrasesData } = await useAsyncData(
  "Phrases",
  async () => {
    const res = (await $fetch(
      "https://pensador-api.vercel.app/?term=trabalho&max=1"
    )) as Phrase;

    return res.frases[0].texto;
  },
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

loading.value.default = false;
</script>

<template>
  <v-skeleton-loader
    :loading="loading.default"
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
      <span class="text-caption text-white">{{ phrasesData }}</span>
    </div>
  </v-skeleton-loader>
</template>
