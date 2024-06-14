<script setup lang="ts">
import type { Weather } from "~/interfaces/Weather";

const loading = ref({ type: Boolean, default: true });

const url = `${useRuntimeConfig().public.base_url_weather}/weather?appid=${
  useRuntimeConfig().public.key_weather
}&lang=pt_br&Mode=json&id=3463011&units=metric`;

const { data: weatherData } = await useAsyncData("Weather", async () => {
  const res = (await $fetch(url)) as Weather;

  return res;
});

loading.value.default = false;
</script>

<template>
  <v-skeleton-loader
    :loading="loading.default"
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
        <span class="text-h5 text-white font-weight-bold">{{ weatherData?.name }}</span>
      </div>
      <div class="text-body-2 text-white text-center font-weight-regular">
        <span>{{ weatherData?.main.temp }} º C</span>
      </div>
      <div class="d-flex flex-row align-center justify-center">
        <span class="text-body-1 text-white">
          {{ weatherData?.weather[0].description }}
        </span>

        <NuxtImg
          :src="`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`"
          format="webp"
          loading="lazy"
        />
      </div>
      <div class="d-flex flex-rows align-center justify-center">
        <div>
          <v-icon class="mr-2" color="white">mdi-water</v-icon>
          <span class="text-overline text-white">
            {{ weatherData?.main.humidity }}%
          </span>
        </div>
        <div>
          <v-icon class="mr-2" color="white">mdi-weather-windy</v-icon>
          <span class="text-overline text-white">
            {{ weatherData?.wind.speed }}km/h
          </span>
        </div>
      </div>
    </div>
  </v-skeleton-loader>
</template>
