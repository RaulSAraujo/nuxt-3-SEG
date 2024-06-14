<script setup>
definePageMeta({
  layout: "login",
  name: "LoginPage",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/home",
  },
});

useHead({
  titleTemplate: `Login - %s`,
});

const overlay = reactive({
  message: "",
  active: false,
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

        <LoginForm
          @active="overlay.active = $event"
          @message="overlay.message = $event"
        />
      </div>
    </v-col>
  </v-row>

  <LoginOverlay
    :active="overlay.active"
    :message="overlay.message"
    @close="overlay.active = $event"
  />
</template>
