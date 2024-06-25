<script setup lang="ts">
defineProps<{ title: string; disabledMenu: boolean }>();
</script>

<template>
  <v-toolbar flat density="compact">
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer />

    <slot name="toolbarExtend" />

    <TableMenu :disabled="disabledMenu" />
  </v-toolbar>
</template>
