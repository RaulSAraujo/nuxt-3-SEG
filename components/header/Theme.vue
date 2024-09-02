<script setup lang="ts">
import type { User } from "~/interfaces/User";

const theme = useTheme();

const { data } = useAuthState();
const user = data.value as User;

onMounted(() => {
  theme.global.name.value = user.theme ? "light" : "dark";

  if (theme.global.name.value === "light") {
    document.documentElement.style.setProperty("--track-color", "#ffffff");
    document.documentElement.style.setProperty("--track-color-hover", "#b7b4b4");
    document.documentElement.style.setProperty("--thumb-color", "#d6d5d5");
    document.documentElement.style.setProperty("--border-color", "#ffffff");
  } else {
    document.documentElement.style.removeProperty("--track-color");
    document.documentElement.style.removeProperty("--track-color-hover");
    document.documentElement.style.removeProperty("--thumb-color");
    document.documentElement.style.removeProperty("--border-color");
  }
});

async function toggleTheme() {
  try {
    await useNuxtApp().$customFetch("/user", {
      method: "PUT",
      body: {
        id: user.id,
        theme: theme.global.current.value.dark,
      },
    });

    theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";

    user.theme = theme.global.name.value === "dark" ? false : true;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    return $toast().error(`${err.statusText ?? err.message}`);
  }

  $fetch("/api/auth/session", {
    method: "PUT",
    body: {
      id: user.id,
      theme: theme.global.name.value === "dark" ? false : true,
    },
  });

  if (theme.global.name.value === "light") {
    document.documentElement.style.setProperty("--track-color", "#ffffff");
    document.documentElement.style.setProperty("--track-color-hover", "#b7b4b4");
    document.documentElement.style.setProperty("--thumb-color", "#d6d5d5");
    document.documentElement.style.setProperty("--border-color", "#ffffff");
  } else {
    document.documentElement.style.removeProperty("--track-color");
    document.documentElement.style.removeProperty("--track-color-hover");
    document.documentElement.style.removeProperty("--thumb-color");
    document.documentElement.style.removeProperty("--border-color");
  }
}
</script>

<template>
  <v-btn
    icon="mdi-weather-night"
    :color="!theme.global.current.value.dark ? '' : 'blue'"
    variant="plain"
    @click="toggleTheme()"
  />
</template>
