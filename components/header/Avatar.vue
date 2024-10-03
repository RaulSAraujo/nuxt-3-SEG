<script setup lang="ts">
import type { User } from "~/interfaces/User";

const { data, signOut } = useAuth();

const user = data.value as User;

const { $config } = useNuxtApp();
</script>

<template>
  <v-menu location="bottom" transition="slide-y-transition" offset="12 20">
    <template #activator="{ props }">
      <ClientOnly>
        <v-avatar
          v-bind="props"
          :image="`${$config.public.base_url_file_manager}/user-photos?userId=${user.id}&type=image`"
          size="50"
          class="mx-5"
          style="cursor: pointer"
        />

        <template #fallback>
          <v-skeleton-loader
            width="50px"
            color="transparent"
            type="avatar"
            class="ml-4 mr-6"
          />
        </template>
      </ClientOnly>
    </template>

    <v-list lines="one" density="compact" nav class="rounded-xl">
      <v-list-item :to="{ name: 'profile' }">
        <template #prepend>
          <v-icon icon="mdi-account-box" />
        </template>

        <v-list-item-title class="text-uppercase"> PERFIL </v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'options' }">
        <template #prepend>
          <v-icon icon="mdi-cog" />
        </template>

        <v-list-item-title class="text-uppercase"> OPÇÕES </v-list-item-title>
      </v-list-item>
      <v-list-item @click="signOut({ callbackUrl: '/' })">
        <template #prepend>
          <v-icon icon="mdi-exit-to-app" />
        </template>

        <v-list-item-title>SAIR</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
