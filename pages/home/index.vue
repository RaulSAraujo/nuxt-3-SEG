<script setup lang="ts">
useHead({
  titleTemplate: `Home - %s`,
});
</script>

<template>
  <HomeBackgroud>
    <v-sheet
      height="52vh"
      class="d-flex flex-rows align-end justify-center"
      color="transparent"
    >
      <div class="d-flex flex-column justify-center">
        <HomeClock />

        <HomePhrases />
      </div>
    </v-sheet>

    <HomeWeather />
  </HomeBackgroud>
</template>
