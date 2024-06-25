<script setup lang="ts">
const store = useGridStore();
const { drawer } = storeToRefs(store);
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    :width="300"
    temporary
  >
    <template #prepend>
      <TableMenuGridDrawerPrepend />
    </template>

    <TableMenuGridDrawerDefault />

    <template #append>
      <TableMenuGridDrawerAppend />
    </template>
  </v-navigation-drawer>
</template>
