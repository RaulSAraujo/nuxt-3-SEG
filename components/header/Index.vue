<script setup lang="ts">
</script>

<template>
  <v-app-bar scroll-behavior="collapse" scroll-threshold="100" elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon icon="mdi-home" to="/home" variant="plain" />
    </template>

    <v-app-bar-title>
      <HeaderMenu />
    </v-app-bar-title>

    <template #append>
      <HeaderNotifications />
      <HeaderTheme />
      <HeaderAvatar />
    </template>
  </v-app-bar>
</template>
