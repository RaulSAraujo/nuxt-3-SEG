<script setup lang="ts">
import type { User } from "~/interfaces/User";

const theme = useTheme();

const { data } = useAuthState();
const user = data.value as User;

onMounted(() => {
  theme.global.name.value = user.theme ? "light" : "dark";
});

async function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";

  user.theme = theme.global.name.value === "dark" ? false : true;

  $api()
    .put("/user", {
      id: user.id,
      theme: theme.global.name.value === "dark" ? false : true,
    })
    .then(() => {
      // Update useStorage(Nitro) local
      $fetch("/api/session", {
        method: "PUT",
        body: {
          theme: theme.global.name.value === "dark" ? false : true,
        },
      });
    });
}
</script>

<template>
  <v-btn
    icon="mdi-weather-night"
    :color="!theme.global.current.value.dark ? 'grey' : 'blue'"
    variant="plain"
    @click="toggleTheme()"
  />
</template>
