<script setup lang="ts">
import type { Weather } from "~/interfaces/Weather";

const { data, status } = useLazyFetch("/weather", {
  key: "Weather",
  baseURL: useRuntimeConfig().public.base_url_weather as string,
  params: {
    appid: useRuntimeConfig().public.key_weather,
    lang: "pt_br",
    Mode: "json",
    id: "3463011",
    units: "metric",
  },
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData: Weather) => ({
    name: fetchData.name,
    temp: fetchData.main.temp,
    description: fetchData.weather[0].description,
    icon: fetchData.weather[0].icon,
    humidity: fetchData.main.humidity,
    speed: fetchData.wind.speed,
  }),
});
</script>

<template>
  <v-skeleton-loader
    :loading="status === 'pending'"
    width="20vw"
    type="image"
    theme="light"
    color="transparent"
    style="position: absolute; bottom: 10px; left: 10px"
  >
    <div
      style="width: 250px; height: 170px; background-color: rgba(0, 0, 0, 0.3)"
      class="rounded-xl pa-5"
    >
      <div class="text-center">
        <v-icon class="mr-2" color="white">mdi-map-marker</v-icon>
        <span class="text-h5 text-white font-weight-bold">{{ data?.name }}</span>
      </div>
      <div class="text-body-2 text-white text-center font-weight-regular">
        <span>{{ data?.temp }} º C</span>
      </div>
      <div class="d-flex flex-row align-center justify-center">
        <span class="text-body-1 text-white">
          {{ data?.description }}
        </span>

        <NuxtImg
          :src="`https://openweathermap.org/img/wn/${data?.icon}.png`"
          format="webp"
          loading="lazy"
        />
      </div>
      <div class="d-flex flex-rows align-center justify-center">
        <div>
          <v-icon class="mr-2" color="white">mdi-water</v-icon>
          <span class="text-overline text-white"> {{ data?.humidity }}% </span>
        </div>
        <div>
          <v-icon class="mr-2" color="white">mdi-weather-windy</v-icon>
          <span class="text-overline text-white"> {{ data?.speed }}km/h </span>
        </div>
      </div>
    </div>
  </v-skeleton-loader>
</template>
