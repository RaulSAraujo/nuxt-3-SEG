<script setup lang="ts">
import type { User } from "~/interfaces/User";

const { signOut } = useAuth();
const { data } = useAuthState();

const user = data.value as User;
</script>

<template>
  <v-menu location="bottom" transition="slide-y-transition" offset="15 20">
    <template #activator="{ props }">
      <v-btn icon v-bind="props" class="mr-5">
        <v-avatar :image="`data:image/jpeg;base64,${user.profile_image}`" size="50" />
      </v-btn>
    </template>

    <v-list lines="one" density="compact" nav>
      <v-list-item>
        <!-- :to="{ name: 'profile' }" -->
        <template v-slot:prepend>
          <v-icon icon="mdi-account-box" />
        </template>

        <v-list-item-title v-text="'PERFIL'" class="text-uppercase" />
      </v-list-item>
      <v-list-item>
        <!-- :to="{ name: 'option-index' }" -->

        <template v-slot:prepend>
          <v-icon icon="mdi-cog" />
        </template>

        <v-list-item-title v-text="'OPÇÕES'" class="text-uppercase" />
      </v-list-item>
      <v-list-item @click="signOut({ callbackUrl: '/' })">
        <template v-slot:prepend>
          <v-icon icon="mdi-exit-to-app" />
        </template>

        <v-list-item-title>SAIR</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
