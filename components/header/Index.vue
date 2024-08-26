<script setup lang="ts">
import type { Page } from "~/interfaces/Page";
import type { User } from "~/interfaces/User";

const { data } = useAuthState();
const user = data.value as User;

const { data: pages, status } = useFetch<Page[]>("/api/pages", {
  key: "Pages",
  params: {
    group_id: user.group_id,
  },
});
</script>

<template>
  <v-app-bar scroll-behavior="elevate" scroll-threshold="100">
    <template #prepend>
      <v-app-bar-nav-icon icon="mdi-home" to="/home" variant="plain" />
    </template>

    <v-app-bar-title>
      <HeaderMenu v-if="status == 'success'" :pages="pages!" />
    </v-app-bar-title>

    <template #append>
      <HeaderNotifications />
      <HeaderTheme />
      <HeaderAvatar />
    </template>
  </v-app-bar>
</template>
