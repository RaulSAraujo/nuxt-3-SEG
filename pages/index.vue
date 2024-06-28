<script setup lang="ts">
definePageMeta({
  layout: "login",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/home",
  },
});

useHead({
  titleTemplate: `Login - %s`,
});
</script>

<template>
  <v-row no-gutters>
    <v-col cols="9">
      <LoginBackgroud />
    </v-col>
    <v-col cols="3" class="d-flex align-center justify-center bg-black">
      <div class="w-75">
        <LoginLogo />

        <LoginForm />
      </div>
    </v-col>
  </v-row>
</template>
