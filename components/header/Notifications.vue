<script setup lang="ts">
import type { User } from "~/interfaces/User";

const now = useNow({ interval: 1000 });

interface Notifications {
  id: number;
  author: string;
  message: string;
  date: string;
}

const selected = ref<Notifications[]>([]);

const { data } = useAuthState();
const user = data.value as User;

const notifications = useState<Notifications[]>(() => []);

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

const readAll = () => {
  notifications.value.forEach((element) => {
    selected.value.push(element);
  });
};

const readNotifier = (active: boolean) => {
  if (active === false && selected.value.length > 0) {
    for (const notification of selected.value) {
      socket.emit("readedNotification", {
        user_id: user.id,
        notification_id: notification.id,
      });
    }

    const newArray = selected.value.sort((a, b) => b.id - a.id);

    newArray.forEach((n: Notifications) => {
      const index = useArrayFindIndex(notifications, (e: Notifications) => e.id == n.id)
        .value;

      notifications.value.splice(index, 1);
    });

    selected.value = [];
  }
};
</script>

<template>
  <v-menu
    v-if="notifications.length > 0"
    offset="20 140"
    location="bottom"
    transition="slide-y-transition"
    :close-on-content-click="false"
    @update:model-value="readNotifier"
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

    <v-list
      v-model:selected="selected"
      :selectable="true"
      select-strategy="leaf"
      lines="one"
      density="default"
      width="350px"
      class="rounded-xl"
    >
      <v-row no-gutters justify="space-between" align="center" class="mx-4 my-2">
        <span class="text-body-1">NOTIFICAÇÕES</span>

        <v-btn
          icon="mdi-notification-clear-all"
          variant="plain"
          density="compact"
          @click="readAll()"
        />
      </v-row>

      <v-divider />

      <v-virtual-scroll
        :items="notifications"
        min-height="250px"
        max-height="350px"
        item-height="64px"
        style="
          --width-scrollbar: 5px;
          --track-color: rgba(0, 0, 0, 0);
          --thumb-color: #8080804d;
          --border-color: rgba(0, 0, 0, 0);
          --track-color-hover: #808080a3;
        "
      >
        <template #default="{ item }">
          <v-list-item color="grey-darken-3" :value="item">
            <v-list-item-title class="text-body-2">
              {{ item.author }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              {{ item.message }}
            </v-list-item-subtitle>

            <template #append="{ isActive }">
              <v-list-item-action start>
                <v-badge
                  v-if="!isActive"
                  dot
                  color="blue"
                  style="position: absolute; top: 5px; right: 10px"
                />
                <div v-else />

                <span class="text-overline font-italic">
                  {{ $dayjs(now).diff(item.date, "minutes") }} Min
                </span>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider />
        </template>
      </v-virtual-scroll>
    </v-list>
  </v-menu>

  <v-btn v-else variant="plain" icon="mdi-bell" />
</template>
