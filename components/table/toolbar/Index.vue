<script setup lang="ts">
defineProps<{ title: string; disabledMenu: boolean }>();
</script>

<template>
  <v-toolbar :elevation="5">
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer />

    <slot name="toolbarExtend" />

    <TableToolbarMenu :disabled="disabledMenu">
      <template #menu>
        <slot name="menu" />
      </template>
    </TableToolbarMenu>
  </v-toolbar>
</template>
