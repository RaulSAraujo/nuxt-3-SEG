<script lang="ts" setup>
import type { RouteLocationAsRelativeTyped, RouteMapGeneric } from "vue-router";

interface Notifications {
  id: number;
  author: string;
  message: string;
  date: string;
  redirect?: RouteLocationAsRelativeTyped<RouteMapGeneric, string>;
}

const emit = defineEmits(["readNotifier"]);

const notifications = useState<Notifications[]>("Notifications", () => []);

// const readNotifier = (active: boolean) => {
//   if (active === false && selected.value.length > 0) {
//     for (const notification of selected.value) {
//       socket.emit("readedNotification", {
//         user_id: user.id,
//         notification_id: notification.id,
//       });
//     }

//     const newArray = selected.value.sort((a, b) => b.id - a.id);

//     newArray.forEach((n: Notifications) => {
//       const index = useArrayFindIndex(notifications, (e: Notifications) => e.id == n.id)
//         .value;

//       notifications.value.splice(index, 1);
//     });

//     selected.value = [];
//   }
// };

const readNotifier = (index: number) => {
  emit("readNotifier", notifications.value[index].id);

  notifications.value.splice(index, 1);
};
</script>

<template>
  <v-virtual-scroll
    :items="notifications"
    max-height="650px"
    item-height="64px"
    class="mb-2"
    style="
      --width-scrollbar: 5px;
      --track-color: rgba(0, 0, 0, 0);
      --thumb-color: #8080804d;
      --border-color: rgba(0, 0, 0, 0);
      --track-color-hover: #808080a3;
    "
  >
    <template #default="{ item, index }">
      <v-list-item color="grey-darken-3">
        <template #prepend>
          <div class="d-flex flex-column mr-2">
            <v-btn
              icon="mdi-close"
              density="comfortable"
              variant="plain"
              color="red"
              @click="readNotifier(index)"
            />
          </div>
        </template>

        <template #title>
          <span class="text-body-2">{{ item.author }}</span>
        </template>

        <template #subtitle>
          <HeaderNotificationsSubtitle :message="item.message" />
        </template>

        <template #append>
          <div class="d-flex flex-column justify-end align-end">
            <HeaderNotificationsButtonRedirect :redirect="item.redirect" />

            <HeaderNotificationsTime :date="item.date" />
          </div>
        </template>
      </v-list-item>

      <v-divider v-if="notifications.length > index + 1" />
    </template>
  </v-virtual-scroll>
</template>
