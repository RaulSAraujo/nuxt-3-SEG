<script lang="ts" setup>
import type { RouteLocationAsRelativeTyped, RouteMapGeneric } from "vue-router";

const props = defineProps<{
  redirect?: RouteLocationAsRelativeTyped<RouteMapGeneric, string>;
}>();

const { resolve } = useRouter();

const redirect = () => {
  if (!props.redirect) return;

  const resolvedUrl = resolve(props.redirect).href;

  window.open(resolvedUrl, "_blank");
};
</script>

<template>
  <v-btn
    icon="mdi-open-in-new"
    density="comfortable"
    size="small"
    variant="plain"
    :color="!props.redirect ? 'grey' : 'primary'"
    :disabled="!props.redirect"
    @click="redirect()"
  />
</template>
