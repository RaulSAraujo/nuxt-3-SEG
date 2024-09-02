<script setup lang="ts">
import type { User } from "~/interfaces/User";

const now = useNow({ interval: 1000 });

const selected = ref<{ id: number; author: string; message: string; date: string }[]>([]);
// watch(selected, (newValue, oldValue) => {
//   console.log(newValue);
//   console.log(oldValue);
// });

const { data } = useAuthState();
const user = data.value as User;

let ws: WebSocket | undefined;
const notifications = useState<
  { id: number; author: string; message: string; date: string }[]
>(() => []);

const connect = async () => {
  const url = `ws://http://192.168.1.10:2001/api/chat-ws?user_id=${user.id}&group_id=${user.group_id}`;

  if (ws) {
    console.log("ws", "Closing previous connection before reconnecting...");

    ws.close();
  }

  console.log("ws", "Connecting to", url, "...");
  ws = new WebSocket(url);

  ws.addEventListener("newNotification", (event) => {
    console.log(event);
  });

  await new Promise((resolve) => ws!.addEventListener("open", resolve));
  console.log("ws", "Connected!");
};

onMounted(() => {
  const host = window.location.hostname;

  if (!host.includes("ddns")) {
    // connect();
  }
});
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
      <v-badge color="blue" bordered :content="notifications.length">
        <v-btn v-bind="props" icon="mdi-bell" variant="plain" />
      </v-badge>
    </template>

    <v-list
      v-model:selected="selected"
      :selectable="true"
      select-strategy="leaf"
      lines="one"
      density="compact"
      width="250px"
      class="rounded-xl"
    >
      <v-row no-gutters justify="space-between" align="center" class="mx-4 my-2">
        <span class="text-body-1">NOTIFICAÇÕES</span>

        <v-btn icon="mdi-notification-clear-all" variant="plain" density="compact" />
        <!-- @click="readAll()" -->
      </v-row>

      <v-divider />

      <v-virtual-scroll
        :items="notifications"
        height="250px"
        item-height="64px"
        class="my-2"
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
