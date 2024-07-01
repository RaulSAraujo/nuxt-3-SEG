<script setup lang="ts">
const store = useGridStore();
const { drawer } = storeToRefs(store);

const availableOrHidden = ref<boolean>(false);
</script>

<template>
  <LazyClientOnly>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      :width="300"
      temporary
    >
      <template #prepend>
        <TableMenuGridDrawerPrepend />
      </template>

      <TableMenuGridDrawerDefault :available-or-hidden="availableOrHidden" />

      <template #append>
        <TableMenuGridDrawerAppend
          :available-or-hidden="availableOrHidden"
          @switch="availableOrHidden = !availableOrHidden"
        />
      </template>
    </v-navigation-drawer>
  </LazyClientOnly>
</template>
