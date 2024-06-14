<script setup>
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon icon="mdi-home" to="/home" variant="plain" />
    </template>

    <v-app-bar-title>
      <HeaderMenu />
    </v-app-bar-title>

    <template v-slot:append>
      <HeaderNotifications />
      <HeaderTheme />
      <HeaderAvatar />
    </template>
  </v-app-bar>
</template>
