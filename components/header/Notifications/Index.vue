<script setup lang="ts">
import type { User } from "~/interfaces/User";
import type { RouteLocationAsRelativeTyped, RouteMapGeneric } from "vue-router";

interface Notifications {
  id: number;
  author: string;
  message: string;
  date: string;
  redirect?: RouteLocationAsRelativeTyped<RouteMapGeneric, string>;
}

const { data } = useAuthState();
const user = data.value as User;

const notifications = useState<Notifications[]>("Notifications", () => []);

// Close socket default
const socketDefault = useSocket();
socketDefault.close();

const { $io } = useNuxtApp();

const socket = $io("http://192.168.1.10:2001", {
  query: {
    user_id: user.id,
    group_id: user.group_id,
  },
});

// Evento disparado quando a novas notificações
socket.on("newNotification", (msg: Notifications[]) => {
  notifications.value.splice(0, 0, ...msg);
});

// Evento que recebe as notificações antigas que não foram lidas
socket.on("previousNotifications", (msg: Notifications[]) => {
  notifications.value = [];

  notifications.value.push(...msg.sort((a, b) => b.id - a.id));
});

const readNotifier = (id: number) => {
  socket.emit("readedNotification", {
    user_id: user.id,
    notification_id: id,
  });
};
</script>

<template>
  <v-menu
    v-if="notifications.length > 0"
    offset="20 140"
    location="bottom"
    transition="slide-y-transition"
    :close-on-content-click="false"
  >
    <template #activator="{ props }">
      <v-badge
        color="blue"
        bordered
        :content="notifications.length"
        offset-y="10"
        offset-x="10"
      >
        <v-btn v-bind="props" icon="mdi-bell" variant="plain" />
      </v-badge>
    </template>

    <v-sheet width="350px" class="rounded-xl">
      <v-row no-gutters justify="space-between" align="center" class="mx-4 my-2">
        <span class="text-body-1">NOTIFICAÇÕES</span>

        <HeaderNotificationsButtonReadAll @read-notifier="readNotifier($event)" />
      </v-row>

      <v-divider />

      <HeaderNotificationsList @read-notifier="readNotifier($event)" />
    </v-sheet>
  </v-menu>

  <v-btn v-else variant="plain" icon="mdi-bell" />
</template>
