<script setup lang="ts">
import type { Page } from "~/interfaces/Page";
import type { User } from "~/interfaces/User";

const theme = useTheme();

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
  <v-app-bar
    scroll-behavior="elevate"
    scroll-threshold="100"
    :color="!theme.global.current.value.dark ? 'primary' : ''"
  >
    <template #prepend>
      <v-app-bar-nav-icon icon="mdi-home" to="/home" variant="plain" />
    </template>

    <v-app-bar-title>
      <HeaderMenu v-if="status == 'success'" :pages="pages!" />
    </v-app-bar-title>

    <template #append>
      <v-btn
        icon="mdi-face-agent"
        variant="plain"
        color="grey"
        :to="{
          name: 'support-request',
        }"
      />
      <HeaderNotifications />
      <HeaderTheme />
      <HeaderAvatar />
    </template>
  </v-app-bar>
</template>
