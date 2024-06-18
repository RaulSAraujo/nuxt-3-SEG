<script setup>
const props = defineProps({
  title: { type: String, default: "" },
  disabledMenu: { type: Boolean, default: false },
});
</script>

<template>
  <v-toolbar flat>
    <v-toolbar-title>{{ props.title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name="toolbarExtend" />

    <TableMenu :disabled="disabledMenu" />
  </v-toolbar>
</template>
