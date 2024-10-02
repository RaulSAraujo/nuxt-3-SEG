<script lang="ts" setup>
interface Notifications {
  id: number;
  author: string;
  message: string;
  date: string;
}

const emit = defineEmits(["readNotifier"]);

const notifications = useState<Notifications[]>("Notifications", () => []);

const readAll = () => {
  notifications.value.forEach((element) => {
    emit("readNotifier", element.id);
  });

  notifications.value = [];
};
</script>

<template>
  <v-btn
    icon="mdi-notification-clear-all"
    variant="plain"
    density="compact"
    @click="readAll()"
  />
</template>
