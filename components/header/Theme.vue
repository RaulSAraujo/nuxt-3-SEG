<script setup>
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-btn class="ml-2" icon @click="toggleTheme()">
    <v-icon :color="!theme.global.current.value.dark ? 'grey' : 'blue'">mdi-weather-night</v-icon>
  </v-btn>
</template>
