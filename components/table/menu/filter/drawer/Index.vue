<script setup lang="ts">
const store = useFilterStore();
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
      <TableMenuFilterDrawerPrepend />
    </template>

    <TableMenuFilterDrawerDefault />

    <template #append>
      <TableMenuFilterDrawerAppend />
    </template>
  </v-navigation-drawer>
</template>
