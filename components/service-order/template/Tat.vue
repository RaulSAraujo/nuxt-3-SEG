<script lang="ts" setup>
const props = defineProps<{
  createdAt: string;
  closeOrderAt: string | null;
}>();

const dayjs = useDayjs();

const time = ref(0);

const color = ref("");

let diff;
if (props.closeOrderAt != null) {
  diff = dayjs(props.closeOrderAt).diff(props.createdAt);
} else {
  diff = dayjs().diff(props.createdAt);
}

diff = diff / (1000 * 60 * 60 * 24);

time.value = parseInt(diff.toFixed(0));

if (time.value <= 10) {
  color.value = "green";
} else if (time.value >= 11 && time.value <= 20) {
  color.value = "yellow";
} else {
  color.value = "red";
}
</script>

<template>
  <v-avatar :color="color" size="x-small">
    <span class="text-caption">{{ time }}</span>
  </v-avatar>
</template>
